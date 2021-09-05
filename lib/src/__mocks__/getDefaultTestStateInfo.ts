import {
    StateInterfaceInfo,
    STATE_PROPERT_TYPES,
} from "../interfaces/StateInterfaceInfo";

export const getDefaultTestStateInfo = (): StateInterfaceInfo => ({
    importClauses: ["import1", "import2"],
    stateProperties: [
        {
            name: "property1",
            nullable: true,
            types: [STATE_PROPERT_TYPES.ARRAY],
            typesText: "null|string[]",
            undefineable: false,
        },
        {
            name: "anotherProperty",
            nullable: false,
            types: [STATE_PROPERT_TYPES.ARRAY],
            typesText: "undefined|string[]",
            undefineable: true,
        },
        {
            name: "anotherProperty2",
            nullable: false,
            types: [STATE_PROPERT_TYPES.STRING],
            typesText: "string",
            undefineable: false,
        },
    ],
    featureData: {
        featureName: "TestFeature",
        folderToFeatureReducer: "/some/folder",
        indexFile: {
            fileExists: false,
            filePath: "/some/folder/reducer/index.ts",
        },
        pathToStateFile: "/some/folder/reducer/state.ts",
        extensionFiles: {
            action: {
                fileExists: false,
                filePath: "/some/folder/action",
            },
            actionCreators: {
                fileExists: false,
                filePath: "/some/folder/actionCreators",
            },
            defaultState: {
                fileExists: false,
                filePath: "/some/folder/defaultState",
            },
            reducerActions: {
                fileExists: false,
                filePath: "/some/folder/reducerAction",
            },
        },
        mainFiles: {
            action: {
                fileExists: false,
                filePath: "/some/folder/action",
            },
            actionCreators: {
                fileExists: false,
                filePath: "/some/folder/actionCreators",
            },
            defaultState: {
                fileExists: false,
                filePath: "/some/folder/defaultState",
            },
            reducerActions: {
                fileExists: false,
                filePath: "/some/folder/reducerAction",
            },
        },
    },
    stateInterfaceName: "TestState",
});
