import { STATE_PROPERT_TYPES } from "../../../interfaces/StateInterfaceInfo";
import type { TemplateHandlebarModel } from "../TemplateHandlebarModel";

export const getTestModel: () => TemplateHandlebarModel = () => {
    const result: TemplateHandlebarModel = {
        options: {
            createReducerContext: true,
            createContextDirectPropertyHooks: false,
            addFunctionalParametersForContextDispatch: false,
            addGetCurrentStateToContext: false,
            addBubbleFlagForActions: true,
            addArrayFunctions: true,
            decoupleStateChangedCallbackByTimeout: false,
            verbatimModuleSyntax: false,
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
        moduleNames: {
            base: {
                actionCreators: "actionCreators.base.generated",
                actions: "actions.base.generated",
                defaultState: "defaultState.base.generated",
                stateProperties: "stateProperties.base.generated",
                reducer: "reducer.base.generated",
                reducerActions: "reducerActions.base.generated",
            },
            extended: {
                actionCreators: "actionCreators.extended",
                actions: "actions.extended",
                reducer: "reducer.extended",
                reducerActions: "reducerActions.extended",
            },
            main: {
                actionCreators: "actionCreators.main.generated",
                actions: "actions.main.generated",
                reducer: "reducer.main.generated",
                reducerActions: "reducerActions.main.generated",
                index: "index.test",
                reducerContext: "reducerContext.test",
            },
        },
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
                    type: "object",
                    initialValue: '""',
                    types: [STATE_PROPERT_TYPES.OBJECT],
                    isArray: false,
                    nullable: false,
                    undefineable: true,
                    arrayActionEnumValues: {
                        add: "TEST1ADD",
                        update: "TEST1UPDATE",
                        remove: "TEST1REMOVE",
                    },
                },
                {
                    baseActionEnumValue: "SET_P2",
                    name: "prop2",
                    namePascalCase: "Prop2",
                    type: "string | undefined",
                    initialValue: "undefined",
                    types: [STATE_PROPERT_TYPES.STRING],
                    isArray: false,
                    nullable: false,
                    undefineable: true,
                    arrayActionEnumValues: {
                        add: "TEST2ADD",
                        update: "TEST2UPDATE",
                        remove: "TEST2REMOVE",
                    },
                },
            ],
            getDefaultStateMethodName: "getTestStateDefault",
        },
    };
    return result;
};
