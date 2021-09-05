import { StringHelper } from "@derfrodo/frodo-s-little-helpers/dist";
import FileSystemHelper from "@derfrodo/frodo-s-little-helpers/dist/util/FileSystemHelper";
import type { ReduxCodeGeneratorOptions } from "../interfaces/ReduxCodeGeneratorOptions";
import type { StateInterfaceInfo } from "../interfaces/StateInterfaceInfo";
import createMockService, { MockedType } from "../__mocks__/createMockService";
import { getDefaultTestStateInfo } from "../__mocks__/getDefaultTestStateInfo";
import getReduxModuleNamingHelperMock from "../__mocks__/getReduxModuleNamingHelperMock";
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

            console.log(visitResult);
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

            console.log(visitResult);
            expect(visitResult.stateInterfaceName === "State");
        });
    });

    describe("StateAnalyzer fake tests", () => {
        it("StateAnalyzer.fake => readfile is working (yay - jest)", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const fsMock = getFileSystemHelperMock();
            fsMock.mock.readFile.mockImplementation(() => {
                console.log("File read");
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
});
