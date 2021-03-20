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
    });
});
