import { getDefaultReduxCodeGeneratorOptions } from "../../interfaces/ReduxCodeGeneratorOptions";
import { getDefaultReduxModuleNamingHelperOptions } from "../../interfaces/ReduxModuleNamingHelperOptions";
import { getDefaultReduxModulFileServiceOptions } from "../../interfaces/ReduxModulFileServiceOptions";
import {
    StateInterfaceInfo,
    STATE_PROPERT_TYPES,
} from "../../interfaces/StateInterfaceInfo";
import { ReduxModuleNamingHelper } from "../ReduxModuleNamingHelper";
import { ReduxModulFileService } from "../ReduxModulFileService";
import { getDefaultTestStateInfo } from "./../../__mocks__/getDefaultTestStateInfo";
import { StateService } from "./StateService";
import { TemplateModelFactory } from "./TemplateModelFactory";

jest.mock("../ReduxModuleNamingHelper");
jest.mock("../ReduxModulFileService");
jest.mock("./StateService");

describe("TemplateModelFactory tests", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("TemplateModelFactory.createActionCreatorsHandlebarModel tests", () => {
        it("TemplateModelFactory.createActionCreatorsHandlebarModel simply calls injected services test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            (
                mockNamingHelper.getActionCreatorsName as jest.MockedFunction<
                    typeof mockNamingHelper.getActionCreatorsName
                >
            ).mockImplementation(() => "testActionName");

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            const testStateInfo = {
                ...getDefaultTestStateInfo(),
            };

            // act
            const result =
                uut.createActionCreatorsHandlebarModel(testStateInfo);

            // assert
            expect(result).toEqual({
                baseActionCreatorsName: "testActionName",
                extendedActionCreatorsName: "testActionName",
                mainActionCreatorsName: "testActionName",
            });
        });
    });
    describe("TemplateModelFactory.createActionsHandlebarModel tests", () => {
        it("TemplateModelFactory.createActionsHandlebarModel simply calls injected services test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            (
                mockNamingHelper.getActionEnumName as jest.MockedFunction<
                    typeof mockNamingHelper.getActionEnumName
                >
            ).mockImplementation(() => "testActionENUMName");
            (
                mockNamingHelper.getActionStrings as jest.MockedFunction<
                    typeof mockNamingHelper.getActionStrings
                >
            ).mockImplementation(() => [
                "testActionString1",
                "testActionString2",
            ]);

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            const testStateInfo = {
                ...getDefaultTestStateInfo(),
            };

            // act
            const result = uut.createActionsHandlebarModel(testStateInfo);

            // assert
            expect(result).toEqual({
                baseActions: ["testActionString1", "testActionString2"],
                baseActionsEnumName: "testActionENUMName",
                extendedActionsEnumName: "testActionENUMName",
                mainActionsEnumName: "testActionENUMName",
            });
        });
    });

    describe("TemplateModelFactory.createReducerActionsHandlebarModel tests", () => {
        it("TemplateModelFactory.createReducerActionsHandlebarModel simply calls injected services test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            (
                mockNamingHelper.getReducerActionName as jest.MockedFunction<
                    typeof mockNamingHelper.getReducerActionName
                >
            ).mockImplementation(() => "testGetReducerActionName");

            (
                mockNamingHelper.getReducerActionTypeGuardMethodName as jest.MockedFunction<
                    typeof mockNamingHelper.getReducerActionTypeGuardMethodName
                >
            ).mockImplementation(
                () => "testGetReducerActionTypeGuardMethodName"
            );

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            const testStateInfo = {
                ...getDefaultTestStateInfo(),
            };

            // act
            const result =
                uut.createReducerActionsHandlebarModel(testStateInfo);

            // assert
            expect(result).toEqual({
                baseReducerActionsName: "testGetReducerActionName",
                baseReducerTypeguard: "testGetReducerActionTypeGuardMethodName",
                extendedReducerActionsName: "testGetReducerActionName",
                extendedReducerTypeguard:
                    "testGetReducerActionTypeGuardMethodName",
                mainReducerActionsName: "testGetReducerActionName",
                mainReducerTypeguard: "testGetReducerActionTypeGuardMethodName",
            });
        });
    });

    describe("TemplateModelFactory.createReducerHandlebarModel tests", () => {
        it("TemplateModelFactory.createReducerHandlebarModel simply calls injected services test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            (
                mockNamingHelper.getReducerMethodName as jest.MockedFunction<
                    typeof mockNamingHelper.getReducerMethodName
                >
            ).mockImplementation(() => "testGetReducerMethodName");

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            const testStateInfo = {
                ...getDefaultTestStateInfo(),
            };

            // act
            const result = uut.createReducerHandlebarModel(testStateInfo);

            // assert
            expect(result).toEqual({
                baseReducerName: "testGetReducerMethodName",
                extendedReducerName: "testGetReducerMethodName",
                mainReducerName: "testGetReducerMethodName",
            });
        });
    });

    describe("TemplateModelFactory.createStateHandlebarModel tests", () => {
        it.each<any>(["", null, undefined, 0])(
            `TemplateModelFactory.createStateHandlebarModel throws on missing state interface name "%s" `,
            async (name) => {
                const mockNamingHelper = new ReduxModuleNamingHelper(
                    getDefaultReduxModuleNamingHelperOptions(),
                    null
                );

                // arrange:
                const mocReduxModulFileService = new ReduxModulFileService(
                    getDefaultReduxModulFileServiceOptions()
                );

                const mocStateService = new StateService();

                const uut = new TemplateModelFactory(
                    mockNamingHelper,
                    mocReduxModulFileService,
                    getDefaultReduxCodeGeneratorOptions(),
                    mocStateService
                );

                const testStateInfo: StateInterfaceInfo = {
                    ...getDefaultTestStateInfo(),
                    stateInterfaceName: name,
                };

                // act
                const method = () =>
                    uut.createStateHandlebarModel(testStateInfo);

                // assert
                expect(method).toThrowError("Failed to resolve state name");
            }
        );

        it.each<[any, boolean]>([
            ["", false],
            [0, false],
            [undefined, false],
            [null, false],
            [false, false],
            ["1", true],
            [true, true],
            [1, true],
            [{}, true],
        ])(
            "TemplateModelFactory.createStateHandlebarModel if %s passed for hasStateAsDefaultExport then it is evaluated to %s",
            async (hasStateAsDefaultExport, expected) => {
                // arrange:
                const mockNamingHelper = new ReduxModuleNamingHelper(
                    getDefaultReduxModuleNamingHelperOptions(),
                    null
                );

                (
                    mockNamingHelper.getGetDefaultStateMethodName as jest.MockedFunction<
                        typeof mockNamingHelper.getGetDefaultStateMethodName
                    >
                ).mockImplementation(() => "testgetGetDefaultStateMethodName");

                const mocReduxModulFileService = new ReduxModulFileService(
                    getDefaultReduxModulFileServiceOptions()
                );

                const mocStateService = new StateService();

                const uut = new TemplateModelFactory(
                    mockNamingHelper,
                    mocReduxModulFileService,
                    getDefaultReduxCodeGeneratorOptions(),
                    mocStateService
                );

                const testStateInfo: StateInterfaceInfo = {
                    ...getDefaultTestStateInfo(),
                    hasStateAsDefaultExport: hasStateAsDefaultExport,
                };

                // act
                const result = uut.createStateHandlebarModel(testStateInfo);

                // assert
                expect(result.hasStateAsDefaultExport).toBe(expected);
            }
        );
        it("TemplateModelFactory.createStateHandlebarModel simply calls injected services test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            (
                mockNamingHelper.getGetDefaultStateMethodName as jest.MockedFunction<
                    typeof mockNamingHelper.getGetDefaultStateMethodName
                >
            ).mockImplementation(() => "testgetGetDefaultStateMethodName");

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            // must not reassign fields :(
            // uut.createStatePropertyHandlebarModel = jest.fn();
            // (
            //     uut.createStatePropertyHandlebarModel as jest.MockedFunction<
            //         typeof uut.createStatePropertyHandlebarModel
            //     >
            // ).mockImplementation(() => ({ name: "FAKEPROP" } as any));

            // uut.getImportClausesWithAdditionalLevel = jest.fn();
            // (
            //     uut.getImportClausesWithAdditionalLevel as jest.MockedFunction<
            //         typeof uut.getImportClausesWithAdditionalLevel
            //     >
            // ).mockImplementation(() => ["FAKEIMPORT"]);

            const testStateInfo: StateInterfaceInfo = {
                ...getDefaultTestStateInfo(),
                stateInterfaceName: "TestStateName",
            };

            // act
            const result = uut.createStateHandlebarModel(testStateInfo);

            // assert
            expect(result).toEqual({
                getDefaultStateMethodName: "testgetGetDefaultStateMethodName",
                hasStateAsDefaultExport: false,
                imports: ["import1", "import2"],
                importsWithAdditionalLevel: ["import1", "import2"],
                properties: [
                    {
                        arrayActionEnumValues: undefined,
                        arrayElementType: undefined,
                        baseActionEnumValue: undefined,
                        initialValue: undefined,
                        isArray: false,
                        name: "property1",
                        namePascalCase: "Property1",
                        nullable: true,
                        type: "null|string[]",
                        types: [4],
                        undefineable: false,
                    },
                    {
                        arrayActionEnumValues: undefined,
                        arrayElementType: undefined,
                        baseActionEnumValue: undefined,
                        initialValue: undefined,
                        isArray: false,
                        name: "anotherProperty",
                        namePascalCase: "AnotherProperty",
                        nullable: false,
                        type: "undefined|string[]",
                        types: [4],
                        undefineable: true,
                    },
                    {
                        arrayActionEnumValues: undefined,
                        arrayElementType: undefined,
                        baseActionEnumValue: undefined,
                        initialValue: undefined,
                        isArray: false,
                        name: "anotherProperty2",
                        namePascalCase: "AnotherProperty2",
                        nullable: false,
                        type: "string",
                        types: [0],
                        undefineable: false,
                    },
                ],
                stateName: "TestStateName",
            });
        });
    });

    describe("TemplateModelFactory.createStatePropertyHandlebarModel tests", () => {
        it("TemplateModelFactory.createStatePropertyHandlebarModel basic test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            (
                mockNamingHelper.getActionString as jest.MockedFunction<
                    typeof mockNamingHelper.getActionString
                >
            ).mockImplementation(() => "testGetActionString");

            (
                mockNamingHelper.getArrayActionStrings as jest.MockedFunction<
                    typeof mockNamingHelper.getArrayActionStrings
                >
            ).mockImplementation(() => ({
                add: "testGetArrayActionStrings",
                remove: "testremove",
                update: "testUpdate",
            }));

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            const mocStateService = new StateService();

            (
                mocStateService.getInitialPropertyValue as jest.MockedFunction<
                    typeof mocStateService.getInitialPropertyValue
                >
            ).mockImplementation(() => "testgetInitialPropertyValue");

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            const testStateInfo = {
                ...getDefaultTestStateInfo(),
            };

            // act
            const result = uut.createStatePropertyHandlebarModel(
                {
                    name: "testName",
                    nullable: false,
                    types: [STATE_PROPERT_TYPES.ARRAY],
                    typesText: "TEXT",
                    undefineable: false,
                    arrayElementType: "string",
                },
                testStateInfo
            );

            // assert
            expect(result).toEqual({
                arrayActionEnumValues: {
                    add: "testGetArrayActionStrings",
                    remove: "testremove",
                    update: "testUpdate",
                },
                arrayElementType: "string",
                baseActionEnumValue: "testGetActionString",
                initialValue: "testgetInitialPropertyValue",
                isArray: true,
                name: "testName",
                namePascalCase: "TestName",
                nullable: false,
                type: "TEXT",
                types: [4],
                undefineable: false,
            });
        });
    });

    describe("TemplateModelFactory.addLevelToImportClause tests", () => {
        it("TemplateModelFactory.addLevelToImportClause adds an additional level to relative path", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );
            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );
            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            // act
            const result = uut.addLevelToImportClause(
                'import something from "./SOMEFILE"'
            );

            // assert
            expect(result).toBe('import something from "./../SOMEFILE"');
        });

        it("TemplateModelFactory.addLevelToImportClause ignores absolute path", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );
            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );
            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            // act
            const result = uut.addLevelToImportClause(
                'import something from "src/SOMEFILE"'
            );

            // assert
            expect(result).toBe('import something from "src/SOMEFILE"');
        });

        it.each<[string, string]>([
            [
                'import something from "./SOMECLAUSE"',
                'import something from "./../SOMECLAUSE"',
            ],
            [
                "import something from './SOMECLAUSE'",
                "import something from './../SOMECLAUSE'",
            ],
            [
                "import something from './..SOMECLAUSE'",
                "import something from './../..SOMECLAUSE'",
            ],
        ])(
            `when %s passed, new result %s is expected`,
            async (given, expected) => {
                // arrange:
                const mockNamingHelper = new ReduxModuleNamingHelper(
                    getDefaultReduxModuleNamingHelperOptions(),
                    null
                );
                const mocReduxModulFileService = new ReduxModulFileService(
                    getDefaultReduxModulFileServiceOptions()
                );
                const mocStateService = new StateService();

                const uut = new TemplateModelFactory(
                    mockNamingHelper,
                    mocReduxModulFileService,
                    getDefaultReduxCodeGeneratorOptions(),
                    mocStateService
                );

                // act
                const result = uut.addLevelToImportClause(given);

                // assert
                expect(result).toBe(expected);
            }
        );

        it.each<string>([
            "SOMECLAUSE",
            "./SOMECLAUSE",
            "./..SOMECLAUSE",
            'import something from "@./SOMECLAUSE"',
            "import something from '@./SOMECLAUSE'",
            "import something from '/SOMECLAUSE'",
        ])(`when %s passed, no changes are applied`, async (given) => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );
            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );
            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            // act
            const result = uut.addLevelToImportClause(given);

            // assert
            expect(result).toBe(given);
        });
    });

    describe("TemplateModelFactory.getImportClausesWithAdditionalLevel tests", () => {
        it("TemplateModelFactory.getImportClausesWithAdditionalLevel maps import clauses using addLevelToImportClause", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );
            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );
            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );
            const importClauses = ["./test", "test2", "../test3"];
            const testStateInfo = {
                ...getDefaultTestStateInfo(),
                importClauses,
            };

            // act
            const result =
                uut.getImportClausesWithAdditionalLevel(testStateInfo);

            // assert
            expect(result).toEqual(
                importClauses.map(uut.addLevelToImportClause)
            );
        });
    });

    describe("TemplateModelFactory.createModuleNamesHandlebarModel tests", () => {
        it("TemplateModelFactory.createModuleNamesHandlebarModel basic test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            (
                mocReduxModulFileService.getGeneratedModulNames as jest.MockedFunction<
                    typeof mocReduxModulFileService.getGeneratedModulNames
                >
            ).mockImplementation(
                () =>
                    ({ defaultState: "TESTSTATEgetGeneratedModulNames" } as any)
            );
            (
                mocReduxModulFileService.getExtensionModulNames as jest.MockedFunction<
                    typeof mocReduxModulFileService.getExtensionModulNames
                >
            ).mockImplementation(
                () =>
                    ({ defaultState: "TESTSTATEgetExtensionModulNames" } as any)
            );

            (
                mocReduxModulFileService.getMainModulNames as jest.MockedFunction<
                    typeof mocReduxModulFileService.getMainModulNames
                >
            ).mockImplementation(
                () => ({ defaultState: "TESTSTATEgetMainModulNames" } as any)
            );

            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            // act
            const result = uut.createModuleNamesHandlebarModel();

            // assert
            expect(result).toEqual({
                base: { defaultState: "TESTSTATEgetGeneratedModulNames" },
                extended: { defaultState: "TESTSTATEgetExtensionModulNames" },
                main: { defaultState: "TESTSTATEgetMainModulNames" },
            });
        });
    });

    describe("TemplateModelFactory.createHandlebarModel tests", () => {
        it("TemplateModelFactory.createHandlebarModel basic test", async () => {
            // arrange:
            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );

            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );

            (
                mocReduxModulFileService.getGeneratedModulNames as jest.MockedFunction<
                    typeof mocReduxModulFileService.getGeneratedModulNames
                >
            ).mockImplementation(
                () =>
                    ({ defaultState: "TESTSTATEgetGeneratedModulNames" } as any)
            );
            (
                mocReduxModulFileService.getExtensionModulNames as jest.MockedFunction<
                    typeof mocReduxModulFileService.getExtensionModulNames
                >
            ).mockImplementation(
                () =>
                    ({ defaultState: "TESTSTATEgetExtensionModulNames" } as any)
            );

            (
                mocReduxModulFileService.getMainModulNames as jest.MockedFunction<
                    typeof mocReduxModulFileService.getMainModulNames
                >
            ).mockImplementation(
                () => ({ defaultState: "TESTSTATEgetMainModulNames" } as any)
            );

            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            const testStateInfo = {
                ...getDefaultTestStateInfo(),
            };

            // act
            const result = uut.createHandlebarModel(testStateInfo);

            // assert
            expect(result).toEqual({
                actionCreators: {
                    baseActionCreatorsName: undefined,
                    extendedActionCreatorsName: undefined,
                    mainActionCreatorsName: undefined,
                },
                actions: {
                    baseActions: undefined,
                    baseActionsEnumName: undefined,
                    extendedActionsEnumName: undefined,
                    mainActionsEnumName: undefined,
                },
                featureName: {
                    asIs: "TestFeature",
                    camelCase: "testFeature",
                    pascalCase: "TestFeature",
                },
                moduleNames: {
                    base: { defaultState: "TESTSTATEgetGeneratedModulNames" },
                    extended: {
                        defaultState: "TESTSTATEgetExtensionModulNames",
                    },
                    main: { defaultState: "TESTSTATEgetMainModulNames" },
                },
                options: {
                    addArrayFunctions: false,
                    addBubbleFlagForActions: false,
                    createReducerContext: false,
                    createContextDirectPropertyHooks: false,
                    addFunctionalParametersForContextDispatch: false,
                    addGetCurrentStateToContext: false,
                    decoupleStateChangedCallbackByTimeout: false,
                    verbatimModuleSyntax: true,
                },
                reducer: {
                    baseReducerName: undefined,
                    extendedReducerName: undefined,
                    mainReducerName: undefined,
                },
                reducerActions: {
                    baseReducerActionsName: undefined,
                    baseReducerTypeguard: undefined,
                    extendedReducerActionsName: undefined,
                    extendedReducerTypeguard: undefined,
                    mainReducerActionsName: undefined,
                    mainReducerTypeguard: undefined,
                },
                state: {
                    getDefaultStateMethodName: undefined,
                    hasStateAsDefaultExport: false,
                    imports: ["import1", "import2"],
                    importsWithAdditionalLevel: ["import1", "import2"],
                    properties: [
                        {
                            arrayActionEnumValues: undefined,
                            arrayElementType: undefined,
                            baseActionEnumValue: undefined,
                            initialValue: undefined,
                            isArray: false,
                            name: "property1",
                            namePascalCase: "Property1",
                            nullable: true,
                            type: "null|string[]",
                            types: [4],
                            undefineable: false,
                        },
                        {
                            arrayActionEnumValues: undefined,
                            arrayElementType: undefined,
                            baseActionEnumValue: undefined,
                            initialValue: undefined,
                            isArray: false,
                            name: "anotherProperty",
                            namePascalCase: "AnotherProperty",
                            nullable: false,
                            type: "undefined|string[]",
                            types: [4],
                            undefineable: true,
                        },
                        {
                            arrayActionEnumValues: undefined,
                            arrayElementType: undefined,
                            baseActionEnumValue: undefined,
                            initialValue: undefined,
                            isArray: false,
                            name: "anotherProperty2",
                            namePascalCase: "AnotherProperty2",
                            nullable: false,
                            type: "string",
                            types: [0],
                            undefineable: false,
                        },
                    ],
                    stateName: "TestState",
                },
            });
        });
    });
});
