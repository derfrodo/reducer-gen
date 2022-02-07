import { StringHelper } from "@derfrodo/frodo-s-little-helpers/dist";
import FileSystemHelper from "@derfrodo/frodo-s-little-helpers/dist/util/FileSystemHelper";
import ts from "typescript";
import type { ReduxCodeGeneratorOptions } from "../interfaces/ReduxCodeGeneratorOptions";
import { StateAnalyzerOptions } from "../interfaces/StateAnalyzerOptions";
import { STATE_PROPERT_TYPES } from "../interfaces/StateInterfaceInfo";
import createMockService, { MockedType } from "../__mocks__/createMockService";
import { StateAnalyzer } from "./StateAnalyzer";

jest.mock("./ReduxModuleNamingHelper");
jest.mock("@derfrodo/frodo-s-little-helpers/dist/util/FileSystemHelper");

export const getFileSystemHelperMock = (): {
    service: FileSystemHelper;
    mock: MockedType<FileSystemHelper>;
} => {
    const mock = new FileSystemHelper();
    const prot: typeof FileSystemHelper = jest.requireActual(
        "@derfrodo/frodo-s-little-helpers/dist/util/FileSystemHelper"
    ).FileSystemHelper;

    const ptype = prot.prototype;
    for (const p in ptype) {
        const property = ptype[p];
        if (typeof property === "function") {
            mock[p] = jest.fn();
        }
    }

    return createMockService(mock);
};

const getDefaultTestGeneratorOptions = (): ReduxCodeGeneratorOptions => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: ReduxCodeGeneratorOptions = {
        createReducerContext: false,
    };
    return result;
};

const getVisitStateFileTestDefaultParams = (): Parameters<
    StateAnalyzer["visitStateFile"]
> => [
    {
        featureName: "fakeFeature",
        folderToFeatureReducer: "fakefeaturefolder",
        indexFile: {
            fileExists: false,
            filePath: "indexfile path",
        },
        pathToStateFile: "pathToIndexFile",
        extensionFiles: {
            action: {
                fileExists: false,
                filePath: "action",
            },
            actionCreators: {
                fileExists: false,
                filePath: "actionCreators",
            },
            defaultState: {
                fileExists: false,
                filePath: "defaultState",
            },
            reducerActions: {
                fileExists: false,
                filePath: "reducerAction",
            },
        },
        mainFiles: {
            action: {
                fileExists: false,
                filePath: "action",
            },
            actionCreators: {
                fileExists: false,
                filePath: "actionCreators",
            },
            defaultState: {
                fileExists: false,
                filePath: "defaultState",
            },
            reducerActions: {
                fileExists: false,
                filePath: "reducerAction",
            },
        },
    },
];

describe("StateAnalyzer tests", () => {
    describe("StateAnalyzer.visitStateFile tests", () => {
        it("StateAnalyzer.visitStateFile finds IState interface name", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.getObjectNameFromFSObjectsPath.mockImplementation(() =>
                Promise.resolve("state.ts")
            );

            fsMock.mock.readFile.mockImplementation(() => {
                return Promise.resolve(`import { APP_STATES } from "../interfaces/APP_STATES";

export interface IState {
    appState: APP_STATES | undefined;
    darkMode: boolean;
}

export default IState;
`);
            });

            const analyzer = new StateAnalyzer(
                options,
                fsMock.service,
                new StringHelper()
            );

            const visitResult = await analyzer.visitStateFile(
                ...getVisitStateFileTestDefaultParams()
            );

            // console.log(visitResult);
            expect(visitResult.stateInterfaceName === "IState");
        });
        it("StateAnalyzer.visitStateFile finds State interface name", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.getObjectNameFromFSObjectsPath.mockImplementation(() =>
                Promise.resolve("state.ts")
            );

            fsMock.mock.readFile.mockImplementation(() => {
                return Promise.resolve(`import { APP_STATES } from "../interfaces/APP_STATES";

export interface State {
    appState: APP_STATES | undefined;
    darkMode: boolean;
}

export default State;
`);
            });

            const analyzer = new StateAnalyzer(
                options,
                fsMock.service,
                new StringHelper()
            );

            const visitResult = await analyzer.visitStateFile(
                ...getVisitStateFileTestDefaultParams()
            );

            // console.log(visitResult);
            expect(visitResult.stateInterfaceName === "State");
        });
    });

    describe("StateAnalyzer fake tests", () => {
        it("StateAnalyzer.fake => readfile is working (yay - jest)", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.readFile.mockImplementation(() => {
                // console.log("File read");
                return Promise.resolve("");
            });

            fsMock.mock.readFile("file", "someEnc");
            expect(fsMock.mock.readFile).toBeCalled();

            //             const moduleNamingHelper = getReduxModuleNamingHelperMock();

            //             const clazz = new StateAnalyzer(
            //                 options,
            //                 new FileSystemHelper(),
            //                 new StringHelper()
            //             );
            //             const state: StateInterfaceInfo = getDefaultTestStateInfo();

            //             moduleNamingHelper.mock.getActionStrings.mockImplementation(() => [
            //                 "action1",
            //                 "action2",
            //             ]);

            //             moduleNamingHelper.mock.getActionEnumName.mockImplementation(
            //                 () => "ActionsEnum"
            //             );

            //             // act
            //             const result = clazz.generateBaseActionContent(state);

            //             // assert
            //             expect(result).toEqual(`export enum ActionsEnum {
            //     action1 = "action1",
            //     action2 = "action2",
            // }

            // export default ActionsEnum;
            // `);
            //         });
        });
    });

    describe("StateAnalyzer resolveTypesOfUnionTypes tests", () => {
        it("StateAnalyzer.resolveTypesOfUnionTypes base test", async () => {
            // arrange:
            const options: StateAnalyzerOptions = {
                ...getDefaultTestGeneratorOptions(),
                srcFolder: "Fakefolder",
            };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.readFile.mockImplementation(() => {
                return Promise.resolve("");
            });

            const uut = new StateAnalyzer(
                options,
                fsMock.service,
                new StringHelper()
            );

            const typeNodes: ts.NodeArray<ts.TypeNode> =
                ts.factory.createNodeArray(
                    [
                        {
                            kind: ts.SyntaxKind.StringKeyword,
                            end: 80,
                            flags: ts.NodeFlags.None,
                            pos: 75,
                        } as ts.KeywordTypeNode,
                    ],
                    false
                );

            // act
            const result = uut.resolveTypesOfUnionTypes({
                types: typeNodes,
                end: 100,
                flags: ts.NodeFlags.None,
            } as ts.UnionTypeNode);

            // assert
            expect(result).toEqual({ types: [STATE_PROPERT_TYPES.STRING] });
        });

        describe.each<ts.SyntaxKind>(
            Object.entries(ts.SyntaxKind)
                .filter(
                    (e) =>
                        typeof e[1] === "number" &&
                        [
                            ts.SyntaxKind.TypeReference,
                            ts.SyntaxKind.ArrayType,
                            ts.SyntaxKind.UnionType,
                            ts.SyntaxKind.BooleanKeyword,
                            ts.SyntaxKind.NumberKeyword,
                            ts.SyntaxKind.StringKeyword,
                            ts.SyntaxKind.UndefinedKeyword,
                            ts.SyntaxKind.NullKeyword,
                        ].findIndex((known) => known === e[1]) === -1
                )
                .map((e) => e[1]) as ts.SyntaxKind[]
        )(
            "StateAnalyzer.resolveTypesOfUnionTypes throws if unknown type %s",
            (given) => {
                it("... to %s", () => {
                    // arrange:
                    const options: StateAnalyzerOptions = {
                        ...getDefaultTestGeneratorOptions(),
                        srcFolder: "Fakefolder",
                    };
                    const fsMock = getFileSystemHelperMock();
                    fsMock.mock.readFile.mockImplementation(() => {
                        return Promise.resolve("");
                    });

                    const uut = new StateAnalyzer(
                        options,
                        fsMock.service,
                        new StringHelper()
                    );

                    const typeNodes: ts.NodeArray<ts.TypeNode> =
                        ts.factory.createNodeArray(
                            [
                                {
                                    kind: given,
                                    end: 80,
                                    flags: ts.NodeFlags.None,
                                    pos: 75,
                                } as ts.KeywordTypeNode,
                            ],
                            false
                        );

                    // act
                    const result = () =>
                        uut.resolveTypesOfUnionTypes({
                            types: typeNodes,
                            end: 100,
                            flags: ts.NodeFlags.None,
                        } as ts.UnionTypeNode);

                    // assert
                    expect(result).toThrowError(
                        /Inner type for unionType for property \"undefined\" in State for.*/
                    );
                });
            }
        );

        describe.each<[ts.SyntaxKind[], STATE_PROPERT_TYPES[]]>([
            [
                [ts.SyntaxKind.StringKeyword, ts.SyntaxKind.TypeReference],
                [STATE_PROPERT_TYPES.STRING, STATE_PROPERT_TYPES.OBJECT],
            ],
            [[ts.SyntaxKind.StringKeyword], [STATE_PROPERT_TYPES.STRING]],
            [[ts.SyntaxKind.ArrayType], [STATE_PROPERT_TYPES.ARRAY]],
            [[ts.SyntaxKind.BooleanKeyword], [STATE_PROPERT_TYPES.BOOLEAN]],
            [[ts.SyntaxKind.NumberKeyword], [STATE_PROPERT_TYPES.NUMBER]],
            // [[ts.SyntaxKind.UndefinedKeyword], []],
            // [[ts.SyntaxKind.NullKeyword], []],
        ])(
            "StateAnalyzer.resolveTypesOfUnionTypes resolves %s to %s",
            (given, expected) => {
                it("... to %s", () => {
                    // arrange:
                    const options: StateAnalyzerOptions = {
                        ...getDefaultTestGeneratorOptions(),
                        srcFolder: "Fakefolder",
                    };
                    const fsMock = getFileSystemHelperMock();
                    fsMock.mock.readFile.mockImplementation(() => {
                        return Promise.resolve("");
                    });

                    const uut = new StateAnalyzer(
                        options,
                        fsMock.service,
                        new StringHelper()
                    );

                    const typeNodes: ts.NodeArray<ts.TypeNode> =
                        ts.factory.createNodeArray(
                            given.map(
                                (val, i) =>
                                    ({
                                        kind: val,
                                        end: 80 + i,
                                        flags: ts.NodeFlags.None,
                                        pos: 75,
                                    } as ts.KeywordTypeNode)
                            ),
                            false
                        );

                    // act
                    const result = uut.resolveTypesOfUnionTypes({
                        types: typeNodes,
                        end: 100,
                        flags: ts.NodeFlags.None,
                    } as ts.UnionTypeNode);

                    // assert
                    expect(result).toEqual({ types: expected });
                });

                it("... with nullable", () => {
                    // arrange:
                    const options: StateAnalyzerOptions = {
                        ...getDefaultTestGeneratorOptions(),
                        srcFolder: "Fakefolder",
                    };
                    const fsMock = getFileSystemHelperMock();
                    fsMock.mock.readFile.mockImplementation(() => {
                        return Promise.resolve("");
                    });

                    const uut = new StateAnalyzer(
                        options,
                        fsMock.service,
                        new StringHelper()
                    );

                    const typeNodes: ts.NodeArray<ts.TypeNode> =
                        ts.factory.createNodeArray(
                            [
                                {
                                    kind: ts.SyntaxKind.NullKeyword,
                                    end: 21,
                                    flags: ts.NodeFlags.None,
                                    pos: 75,
                                } as ts.TypeNode,
                                ...given.map(
                                    (val, i) =>
                                        ({
                                            kind: val,
                                            end: 80 + i,
                                            flags: ts.NodeFlags.None,
                                            pos: 75,
                                        } as ts.KeywordTypeNode)
                                ),
                            ],
                            false
                        );

                    // act
                    const result = uut.resolveTypesOfUnionTypes({
                        types: typeNodes,
                        end: 100,
                        flags: ts.NodeFlags.None,
                    } as ts.UnionTypeNode);

                    // assert
                    expect(result).toEqual({ types: expected, nullable: true });
                });

                it("... with undefinable", () => {
                    // arrange:
                    const options: StateAnalyzerOptions = {
                        ...getDefaultTestGeneratorOptions(),
                        srcFolder: "Fakefolder",
                    };
                    const fsMock = getFileSystemHelperMock();
                    fsMock.mock.readFile.mockImplementation(() => {
                        return Promise.resolve("");
                    });

                    const uut = new StateAnalyzer(
                        options,
                        fsMock.service,
                        new StringHelper()
                    );

                    const typeNodes: ts.NodeArray<ts.TypeNode> =
                        ts.factory.createNodeArray(
                            [
                                {
                                    kind: ts.SyntaxKind.UndefinedKeyword,
                                    end: 21,
                                    flags: ts.NodeFlags.None,
                                    pos: 75,
                                } as ts.TypeNode,
                                ...given.map(
                                    (val, i) =>
                                        ({
                                            kind: val,
                                            end: 80 + i,
                                            flags: ts.NodeFlags.None,
                                            pos: 75,
                                        } as ts.KeywordTypeNode)
                                ),
                            ],
                            false
                        );

                    // act
                    const result = uut.resolveTypesOfUnionTypes({
                        types: typeNodes,
                        end: 100,
                        flags: ts.NodeFlags.None,
                    } as ts.UnionTypeNode);

                    // assert
                    expect(result).toEqual({
                        types: expected,
                        undefineable: true,
                    });
                });
            }
        );
    });

    describe("StateAnalyzer createMemberInfo tests", () => {
        it("StateAnalyzer.createMemberInfo base test", async () => {
            // arrange:
            const options: StateAnalyzerOptions = {
                ...getDefaultTestGeneratorOptions(),
                srcFolder: "Fakefolder",
            };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.readFile.mockImplementation(() => {
                return Promise.resolve("");
            });

            const uut = new StateAnalyzer(
                options,
                fsMock.service,
                new StringHelper()
            );

            const testnode = {
                name: "testnode",
                type: {
                    kind: ts.SyntaxKind.NumberKeyword,
                    getFullText: () => "TEST NODE TEXT",
                } as any,
            } as unknown as ts.PropertySignature;

            // act
            const result = uut.createMemberInfo(testnode, {} as ts.SourceFile);

            // assert
            expect(result).toEqual({
                name: "",
                nullable: false,
                types: [1],
                typesText: "TEST NODE TEXT",
                undefineable: false,
            });
        });

        describe.each<[ts.SyntaxKind, STATE_PROPERT_TYPES[]]>([
            [ts.SyntaxKind.BooleanKeyword, [STATE_PROPERT_TYPES.BOOLEAN]],
            [ts.SyntaxKind.NumberKeyword, [STATE_PROPERT_TYPES.NUMBER]],
            [ts.SyntaxKind.StringKeyword, [STATE_PROPERT_TYPES.STRING]],
            [ts.SyntaxKind.TypeReference, [STATE_PROPERT_TYPES.OBJECT]],
        ])(
            "StateAnalyzer.createMemberInfo gets %s as kind",
            (kind, expectedTypes) => {
                it(`StateAnalyzer.createMemberInfo returns ${expectedTypes}`, () => {
                    // arrange:
                    const options: StateAnalyzerOptions = {
                        ...getDefaultTestGeneratorOptions(),
                        srcFolder: "Fakefolder",
                    };
                    const fsMock = getFileSystemHelperMock();
                    fsMock.mock.readFile.mockImplementation(() => {
                        return Promise.resolve("");
                    });

                    const uut = new StateAnalyzer(
                        options,
                        fsMock.service,
                        new StringHelper()
                    );

                    const testnode = {
                        name: "testnode",
                        type: {
                            kind: kind,
                            getFullText: () => "TEST NODE TEXT",
                        } as any,
                    } as unknown as ts.PropertySignature;

                    // act
                    const result = uut.createMemberInfo(
                        testnode,
                        {} as ts.SourceFile
                    );

                    // assert
                    expect(result).toEqual({
                        name: "",
                        nullable: false,
                        types: expectedTypes,
                        typesText: "TEST NODE TEXT",
                        undefineable: false,
                    });
                });
            }
        );
        describe.each<[ts.SyntaxKind, STATE_PROPERT_TYPES[]]>([
            [ts.SyntaxKind.BooleanKeyword, [STATE_PROPERT_TYPES.BOOLEAN]],
            [ts.SyntaxKind.NumberKeyword, [STATE_PROPERT_TYPES.NUMBER]],
            [ts.SyntaxKind.StringKeyword, [STATE_PROPERT_TYPES.STRING]],
            [ts.SyntaxKind.ArrayType, [STATE_PROPERT_TYPES.ARRAY]],
            [ts.SyntaxKind.TypeReference, [STATE_PROPERT_TYPES.OBJECT]],
        ])(
            "StateAnalyzer.createMemberInfo gets %s as kind",
            (kind, expectedTypes) => {
                it(`StateAnalyzer.createMemberInfo returns node for array type`, () => {
                    // arrange:
                    const options: StateAnalyzerOptions = {
                        ...getDefaultTestGeneratorOptions(),
                        srcFolder: "Fakefolder",
                    };
                    const fsMock = getFileSystemHelperMock();
                    fsMock.mock.readFile.mockImplementation(() => {
                        return Promise.resolve("");
                    });

                    const uut = new StateAnalyzer(
                        options,
                        fsMock.service,
                        new StringHelper()
                    );

                    const testnode = {
                        name: "testnode",
                        type: {
                            kind: ts.SyntaxKind.ArrayType,
                            getFullText: () => "TEST NODE TEXT",
                            elementType: {
                                getFullText: () => "TEST ARRAY NODE TEXT",
                            },
                        } as any,
                    } as unknown as ts.PropertySignature;

                    // act
                    const result = uut.createMemberInfo(
                        testnode,
                        {} as ts.SourceFile
                    );

                    // assert
                    expect(result).toEqual({
                        arrayElementType: "TEST ARRAY NODE TEXT",
                        name: "",
                        nullable: false,
                        types: [STATE_PROPERT_TYPES.ARRAY],
                        typesText: "TEST NODE TEXT",
                        undefineable: false,
                    });
                });
            }
        );
    });

    describe("StateAnalyzer resolveLiteralType tests", () => {
        it("StateAnalyzer.resolveLiteralType base test", async () => {
            // arrange:
            const options: StateAnalyzerOptions = {
                ...getDefaultTestGeneratorOptions(),
                srcFolder: "Fakefolder",
            };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.readFile.mockImplementation(() => {
                return Promise.resolve("");
            });

            const uut = new StateAnalyzer(
                options,
                fsMock.service,
                new StringHelper()
            );

            const typeNode: ts.LiteralTypeNode["literal"] =
                ts.factory.createNull();

            // act
            const result = uut.resolveLiteralType(typeNode);

            // assert
            expect(result).toEqual(STATE_PROPERT_TYPES.NULL);
        });
        describe.each<[ts.LiteralTypeNode["literal"]]>([
            [ts.factory.createTrue()],
            [ts.factory.createFalse()],
            [{ kind: ts.SyntaxKind.PrefixUnaryExpression } as any],
        ])("resolveLiteralType throws on %s as literal", (given) => {
            it(`resolveLiteralType throws when ${
                ts.SyntaxKind[given.kind]
            } is passed`, async () => {
                // arrange:
                const options: StateAnalyzerOptions = {
                    ...getDefaultTestGeneratorOptions(),
                    srcFolder: "Fakefolder",
                };
                const fsMock = getFileSystemHelperMock();
                fsMock.mock.readFile.mockImplementation(() => {
                    return Promise.resolve("");
                });

                const uut = new StateAnalyzer(
                    options,
                    fsMock.service,
                    new StringHelper()
                );

                const typeNode: ts.LiteralTypeNode["literal"] = given;

                // act
                const result = () => uut.resolveLiteralType(typeNode);

                // assert
                expect(result).toThrowError(
                    /Inner type for literal node for property /
                );
            });
        });
        describe.each<[ts.LiteralTypeNode["literal"], STATE_PROPERT_TYPES]>([
            [ts.factory.createNull(), STATE_PROPERT_TYPES.NULL],
        ])("resolveLiteralType resolves %s as literal", (given, expected) => {
            it(`resolveLiteralType resolves to ${expected}`, async () => {
                // arrange:
                const options: StateAnalyzerOptions = {
                    ...getDefaultTestGeneratorOptions(),
                    srcFolder: "Fakefolder",
                };
                const fsMock = getFileSystemHelperMock();
                fsMock.mock.readFile.mockImplementation(() => {
                    return Promise.resolve("");
                });

                const uut = new StateAnalyzer(
                    options,
                    fsMock.service,
                    new StringHelper()
                );

                const typeNode: ts.LiteralTypeNode["literal"] = given;

                // act
                const result = uut.resolveLiteralType(typeNode);

                // assert
                expect(result).toEqual(expected);
            });
        });
    });

    describe("StateAnalyzer resolveTypeType tests", () => {
        it(`resolveTypeType throws when uniontype is passed`, async () => {
            // arrange:
            const options: StateAnalyzerOptions = {
                ...getDefaultTestGeneratorOptions(),
                srcFolder: "Fakefolder",
            };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.readFile.mockImplementation(() => {
                return Promise.resolve("");
            });

            const uut = new StateAnalyzer(
                options,
                fsMock.service,
                new StringHelper()
            );

            const type = ts.factory.createUnionTypeNode([
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
            ]);
            // act
            const result = () => uut.resolveTypeType(type);

            // assert
            expect(result).toThrowError(
                /No union type may be placed in property /
            );
        });

        describe.each<[ts.TypeNode, STATE_PROPERT_TYPES]>([
            [
                ts.factory.createArrayTypeNode(
                    ts.factory.createKeywordTypeNode(
                        ts.SyntaxKind.BooleanKeyword
                    )
                ),
                STATE_PROPERT_TYPES.ARRAY,
            ],
        ])("resolveTypeType resolves on %s", (given, expected) => {
            it(`resolveTypeType resolves when ${
                ts.SyntaxKind[given.kind]
            } is passed`, async () => {
                // arrange:
                const options: StateAnalyzerOptions = {
                    ...getDefaultTestGeneratorOptions(),
                    srcFolder: "Fakefolder",
                };
                const fsMock = getFileSystemHelperMock();
                fsMock.mock.readFile.mockImplementation(() => {
                    return Promise.resolve("");
                });

                const uut = new StateAnalyzer(
                    options,
                    fsMock.service,
                    new StringHelper()
                );

                // act
                const result = uut.resolveTypeType(given);

                // assert
                expect(result).toBe(expected);
            });
        });
    });
});
