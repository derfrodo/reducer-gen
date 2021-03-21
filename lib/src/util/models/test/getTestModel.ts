import { STATE_PROPERT_TYPES } from "../../../interfaces/StateInterfaceInfo";
import { createTestFactory } from "../../services/TemplateModelFactory";
import { TemplateHandlebarModel } from "../TemplateHandlebarModel";

export const getTestModel: () => TemplateHandlebarModel = () => {
    const result: TemplateHandlebarModel = {
        options: {
            createReducerContext: true,
            addBubbleFlagForActions: true,
            addArrayFunctions: true,
        },
        featureName: {
            asIs: "test_feature",
            pascalCase: "TestFeature",
            camelCase: "testFeature",
        },
        reducer: {
            baseReducerName: "baseTestReducer",
            mainReducerName: "mainTestReducer",
            extendedReducerName: "extendedTestReducer",
        },
        reducerActions: {
            baseReducerActionsName: "BASE_REDUCERACTIONS",
            mainReducerActionsName: "MAIN_REDUCERACTIONS",
            extendedReducerActionsName: "EXTENDED_REDUCERACTIONS",
            mainReducerTypeguard: "isMainTestReducer",
            baseReducerTypeguard: "isBaseTestReducer",
            extendedReducerTypeguard: "isExtendedTestReducer",
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
                    type: "object | undefined",
                    initialValue: '""',
                    types: [STATE_PROPERT_TYPES.OBJECT],
                    isArray: false,
                    nullable: false,
                    undefineable: true,
                },
                {
                    baseActionEnumValue: "SET_P2",
                    name: "prop2",
                    namePascalCase: "Prop2",
                    type: "string",
                    initialValue: '""',
                    types: [STATE_PROPERT_TYPES.STRING],
                    isArray: false,
                    nullable: false,
                    undefineable: true,
                },
            ],
            getDefaultStateMethodName: "getTestStateDefault",
        },
    };
    return result;
};
