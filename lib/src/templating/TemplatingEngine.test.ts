import { getTestModel } from "../util/models/test/getTestModel";
import { TemplatingEngine } from "./TemplatingEngine";

describe("Given TemplatingEngine", () => {
    describe("When TemplatingEngine.precompile is called", () => {
        it(", Then actions templates will be filled", async () => {
            // arrange:
            const clazz = new TemplatingEngine();

            // act
            await clazz.initialize();

            // assert
            expect(clazz.actionsTemplates.base).not.toBeUndefined();
        });
    });

    describe("When TemplatingEngine.compile is called", () => {
        describe("... and compilation will be for actions", () => {
            it("... and action base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionsTemplates &&
                    (await clazz.compile(
                        clazz.actionsTemplates.base,
                        testModel
                    ));
                // assert
                expect(result).toBe(`export enum BASE_ACTIONS {
    ACTION1 = "ACTION1",
    ACTION2 = "ACTION2"
}

export default BASE_ACTIONS;
`);
            });
            it("... and action ext template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionsTemplates &&
                    (await clazz.compile(
                        clazz.actionsTemplates.extended,
                        testModel
                    ));
                // assert
                expect(result).toBe(`export enum EXT_ACTIONS {
    // e.g. ADD_LOADING_HANDLE = "ADD_LOADING_HANDLE",
}

export default EXT_ACTIONS;
`);
            });
            it("... and action main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionsTemplates &&
                    (await clazz.compile(
                        clazz.actionsTemplates.main,
                        testModel
                    ));
                // assert
                expect(result)
                    .toBe(`import { BASE_ACTIONS } from "./actions.base.generated";
import { EXT_ACTIONS } from "./actions.extended";

export const MAIN_ACTIONS = { ...BASE_ACTIONS, ...EXT_ACTIONS };

export default MAIN_ACTIONS;
`);
            });
        });
        describe("... and compilation will be for actionCreators", () => {
            it("... and actioncreators main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.actionCreatorsTemplates.main,
                        testModel
                    ));
                // assert
                expect(result)
                    .toBe(`import { CREATOR_BASE } from "./actionCreators.base.generated";
import { CREATOR_EXT } from "./actionCreators.extended";

export const CREATOR_MAIN = { ...CREATOR_BASE, ...CREATOR_EXT };

export default CREATOR_MAIN;
`);
            });

            it("... and actioncreators base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.actionCreatorsTemplates.base,
                        testModel
                    ));

                // console.log(result);
                // assert
                expect(result).toBe(`import test from "with additional level"
import test from "with additional level2"
import { BASE_REDUCERACTIONS as ReducerActions } from "./../reducerActions/reducerActions.base.generated";
import { MAIN_ACTIONS as actions } from "./../actions/actions.main.generated";

export const CREATOR_BASE = {
    setProp1: (nextProp1: function | undefined): ReducerActions => ({
        type: actions.SET_P1,
        next: nextProp1,
    }),
    setProp2: (nextProp2: function | undefined): ReducerActions => ({
        type: actions.SET_P2,
        next: nextProp2,
    }),
};

export default CREATOR_BASE;
`);
            });

            it("... and actioncreators extended template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.actionCreatorsTemplates.extended,
                        testModel
                    ));

                // assert
                expect(result).toBe(`// Uncomment imports if you need to ;)
// import test from "with additional level"
// import test from "with additional level2"

import { EXTENDED_REDUCERACTIONS } from "./../reducerActions/reducerActions.extended";
// import { EXT_ACTIONS } from "./../actions/actions.extended";

/**
 * You may add here extending actionCreators for this features reducer
 * actionCreator: ([params]): ExtenedReducerAction => (
 * {
 *   type: EXT_ACTIONS["[actionName]"],
 *   [payload]
 * }),
 */
const extendedActionCreators = {
    // Add functions like
    // addLoadingHandle: (handleToAdd: symbol) => {
    //    return {
    //        type: EXT_ACTIONS.ADD_LOADING_HANDLE,
    //        handle: handleToAdd
    //        };
    //    },
}

// Start: This is just for typechecking, so that you can utilize the awesomeness of Typescript
type ActionCreator = { [key in string]: (...params: any[]) => EXTENDED_REDUCERACTIONS };

const checkActionCreator: <T>(item: T & ActionCreator) => T = <T>(item: T & ActionCreator) => {
    return item;
};
// End (The function above will be used to create the named export below)

export const CREATOR_EXT = checkActionCreator(extendedActionCreators);

export default CREATOR_EXT;
`);
            });
        });
        describe("... and compilation will be for reducerActions", () => {
            it("... and reducerActions base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerActionsTemplates &&
                    (await clazz.compile(
                        clazz.reducerActionsTemplates.base,
                        testModel
                    ));

                // assert
                expect(result).toBe(`import test from "with additional level"
import test from "with additional level2"
import { BASE_ACTIONS as actions } from "./../actions/actions.base.generated";

export type BASE_REDUCERACTIONS = { type: actions; isBubbled?: boolean } & (
    | {
        type: actions.SET_P1;
        next: function | undefined;
    }
    | {
        type: actions.SET_P2;
        next: function | undefined;
    }
);

export const isBaseTestReducer = (
    item: any
): item is BASE_REDUCERACTIONS => {
    if (!item) {
        return false;
    }
    if (typeof item === "object") {
        const { type } = item;

        return (
            typeof type === "string" &&
            Object.hasOwnProperty.call(actions, type)
        );
    }
    return false;
};

export default BASE_REDUCERACTIONS;
`);
            });
            it("... and reducerActions extended template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerActionsTemplates &&
                    (await clazz.compile(
                        clazz.reducerActionsTemplates.extended,
                        testModel
                    ));
                // assert
                expect(result)
                    .toBe(`import { EXT_ACTIONS as extendedActions } from "./../actions/actions.extended";

/**
 * You may add here extending reducer actions for this features reducer
 */
export type EXTENDED_REDUCERACTIONS = {
    type: extendedActions;
    isBubbled?: boolean;
} & {
    // replace by following template for every extendedActions
    //    | {
    //        type: extendedActions["[action name]"];
    //        /* [additional payload like : next:  boolean;]*/
    //    }
};

export const isExtendedTestReducer = (
    item: any
): item is EXTENDED_REDUCERACTIONS => {
    if (!item) {
        return false;
    }
    if (typeof item === "object") {
        const { type } = item;

        return (
            typeof type === "string" &&
            Object.hasOwnProperty.call(extendedActions, type)
        );
    }
    return false;
};

export default EXTENDED_REDUCERACTIONS;
`);
            });
            it("... and reducerActions main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerActionsTemplates &&
                    (await clazz.compile(
                        clazz.reducerActionsTemplates.main,
                        testModel
                    ));
                console.log(result);
                // assert
                expect(result)
                    .toBe(`import { BASE_REDUCERACTIONS, isBaseTestReducer } from "./reducerActions.base.generated";
import { EXTENDED_REDUCERACTIONS, isExtendedTestReducer } from "./reducerActions.extended";

export type MAIN_REDUCERACTIONS = BASE_REDUCERACTIONS | EXTENDED_REDUCERACTIONS;

export const isMainTestReducer = (item: any): item is MAIN_REDUCERACTIONS => {
    return isBaseTestReducer(item) || isExtendedTestReducer(item);
}

export default PostsReducerActions;
`);
            });
        });
        describe("... and compilation will be for reducer", () => {
            it("... and reducer base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerTemplates &&
                    (await clazz.compile(
                        clazz.reducerTemplates.base,
                        testModel
                    ));

                // assert
                expect(result).toBe(`import test from "with additional level"
import test from "with additional level2"
import { TESTSTATE } from "./../state";
import { getTestStateDefault } from "./../defaultState.base.generated";
import { BASE_ACTIONS as actions } from "./../actions/actions.base.generated";
import { BASE_REDUCERACTIONS } from "./reducerActions/reducerActions.base.generated";

export const baseTestReducer = (state: TESTSTATE = getTestStateDefault(), action: BASE_REDUCERACTIONS): TESTSTATE => {
    switch (action.type) {
        case actions.SET_P1:
            return {
                ...state,
                prop1: action.next,
            };
        case actions.SET_P2:
            return {
                ...state,
                prop2: action.next,
            };
        default:
            return state;
    }
};

export default baseTestReducer;
`);
            });
            it("... and reducer extended template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerTemplates &&
                    (await clazz.compile(
                        clazz.reducerTemplates.extended,
                        testModel
                    ));
                // assert
                expect(result).toBe(`import { TESTSTATE } from "./../state";
import { getTestStateDefault } from "./../defaultState.base.generated";
import { MAIN_REDUCERACTIONS } from "./reducerActions/reducerActions.main.generated";

// import test from "with additional level"
// import test from "with additional level2"

// import { BASE_ACTIONS as actions } from "./../actions/actions.base.generated";
// import { EXT_ACTIONS as actions } from "./../actions/actions.extended";

// Uncomment for some typechecking:
// import { isExtendedTestReducer } from "./../reducerActions/reducerActions.extended";
// import { isBaseTestReducer } from "./../reducerActions/reducerActions.base.generated";

export const extendedTestReducer = (state: TESTSTATE = getTestStateDefault(), action: MAIN_REDUCERACTIONS): TESTSTATE => {
    switch (action.type) {
        //         case actions["[actionName]"]:
        //             return {
        //                 ...state,
        //                 // [action payload]
        //            };
        //         case extendedActions["[actionName]"]:
        //             return {
        //                 ...state,
        //                 // [action payload]
        //              };
        default:
            return state;
    }
};

export default extendedTestReducer;
`);
            });
            it("... and reducer main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerTemplates &&
                    (await clazz.compile(
                        clazz.reducerTemplates.main,
                        testModel
                    ));
                // assert
                expect(result).toBe(`import { TESTSTATE } from "./../state";
import { getTestStateDefault } from "./../defaultState.base.generated";
import { MAIN_REDUCERACTIONS } from "./../reducerActions/reducerActions.main.generated";
import { baseTestReducer } from "./reducer.base.generated";
import { extendedTestReducer } from "./reducer.extended";
import { isBaseTestReducer } from "./../reducerActions/reducerActions.base.generated";

export const mainTestReducer = (state: TESTSTATE = getTestStateDefault(), action:  MAIN_REDUCERACTIONS): TESTSTATE => {
    // Note: Generator may be extended to inversify this order => Just talk to me ;)
    // return extendedTestReducer((isBaseTestReducer(action) ? baseTestReducer(state, action) : state), action);

    return (isBaseTestReducer(action) ? baseTestReducer(extendedTestReducer(state, action), action) : extendedTestReducer(state, action));
};

export default mainTestReducer;
`);
            });
        });
        describe("... and compilation will be for root files", () => {
            it("... and indexMain template is passed and has state as default export, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                testModel.state.hasStateAsDefaultExport = true;
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.rootTemplates.indexMain,
                        testModel
                    ));

                // assert
                expect(result)
                    .toBe(`import { MAIN_REDUCERACTIONS as RAs } from "./reducerActions/reducerActions.main.generated";
import TESTSTATE from "./state";

export { mainTestReducer } from "./reducer/reducer.main.generated";
export { MAIN_ACTIONS } from "./actions/actions.main.generated";
export { EXT_ACTIONS } from "./actions/actions.extended";
export { BASE_ACTIONS } from "./actions/actions.base.generated";
export { CREATOR_MAIN } from "./actionCreators/actionCreators.main.generated";
export * from "./ReducerContext.main.generated";

export { isMainTestReducer } from "./reducerActions/reducerActions.main.generated";
export { isExtendedTestReducer } from "./reducerActions/reducerActions.extended";
export { isBaseTestReducer } from "./reducerActions/reducerActions.base.generated";

export type MAIN_REDUCERACTIONS = RAs;
export type TestFeatureState = TESTSTATE;
`);
            });
            it("... and indexMain template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.rootTemplates.indexMain,
                        testModel
                    ));

                // assert
                expect(result)
                    .toBe(`import { MAIN_REDUCERACTIONS as RAs } from "./reducerActions/reducerActions.main.generated";
import { TESTSTATE } from "./state";

export { mainTestReducer } from "./reducer/reducer.main.generated";
export { MAIN_ACTIONS } from "./actions/actions.main.generated";
export { EXT_ACTIONS } from "./actions/actions.extended";
export { BASE_ACTIONS } from "./actions/actions.base.generated";
export { CREATOR_MAIN } from "./actionCreators/actionCreators.main.generated";
export * from "./ReducerContext.main.generated";

export { isMainTestReducer } from "./reducerActions/reducerActions.main.generated";
export { isExtendedTestReducer } from "./reducerActions/reducerActions.extended";
export { isBaseTestReducer } from "./reducerActions/reducerActions.base.generated";

export type MAIN_REDUCERACTIONS = RAs;
export type TestFeatureState = TESTSTATE;
`);
            });
            it("... and default state template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.rootTemplates.defaultState,
                        testModel
                    ));

                // assert
                expect(result).toBe(`import test from "same as in info level"
import test from "same as in info level2"
import { TESTSTATE } from "./state";

export const getTestStateDefault = (): TESTSTATE => ({
    prop1: "",
    prop2: undefined,
});

export default getTestStateDefault;
`);
            });
            it("... and index template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(clazz.rootTemplates.index, testModel));
                console.log(result);

                // assert
                expect(result).toBe(`export * from "./index.main.generated";
`);
            });
        });
    });
});
