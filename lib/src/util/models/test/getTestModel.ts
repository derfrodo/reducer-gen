import { createTestFactory } from "../../services/ModelFactory";
import { HandlebarModel } from "../HandlebarModel";

export const getTestModel: () => HandlebarModel = () => {
    const result: HandlebarModel = {
        reducerActions: {
            baseReducerActionsName: "BASE_REDUCERACTIONS",
            mainReducerActionsName: "MAIN_REDUCERACTIONS",
            extendedReducerActionsName: "EXTENDED_REDUCERACTIONS",
        },
        actions: {
            baseActionsEnumName: "BASE_ACTIONS",
            extendedActionsEnumName: "EXT_ACTIONS",
            mainActionsEnumName: "MAIN_ACTIONS",
            baseActions: ["ACTION1", "ACTION2"],
        },
        actionCreators: {
            baseActionCreatorsName: "CREATOR_BASE",
            mainActionCreatorsName: "CREATOR_MAIN",
            extendedActionCreatorsName: "CREATOR_EXT",
        },
        moduleNames: createTestFactory().createModuleNamesHandlebarModel(),
        state: {
            importsWithAdditionalLevel: [
                'import test from "with additional level"',
                'import test from "with additional level2"',
            ],
            imports: [
                'import test from "same as in info level"',
                'import test from "same as in info level2"',
            ],
            stateName: "TESTSTATE",
            hasStateAsDefaultExport: false,
            properties: [
                {
                    baseActionEnumValue: "SET_P1",
                    name: "prop1",
                    namePascalCase: "Prop1",
                    type: "function | undefined",
                },
                {
                    baseActionEnumValue: "SET_P2",
                    name: "prop2",
                    namePascalCase: "Prop2",
                    type: "function | undefined",
                },
            ],
        },
    };
    return result;
};
