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
                    .toBe(`import BASE_ACTIONS from "./action.base.generated";
import EXT_ACTIONS from "./action.extended";

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
                    .toBe(`import CREATOR_BASE from "./actionCreators.base.generated";
import CREATOR_EXT from "./actionCreators.extended";

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

                console.log(result);
                // assert
                expect(result).toBe(`import test from "with additional level"
import test from "with additional level2"

import MAIN_REDUCERACTIONS from "./../reducerActions/reducerActions.main.generated";
import { MAIN_ACTIONS as actions } from "./../actions/MAIN_ACTIONS";

export const CREATOR_BASE = {
    setProp1: (nextProp1: function | undefined):  => (
        {
            type: actions.SET_P1,
            next: nextProp1,
        }),
    setProp2: (nextProp2: function | undefined):  => (
        {
            type: actions.SET_P2,
            next: nextProp2,
        }),
}

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

                console.log(result);
                // assert
                expect(result).toBe(``);
            });
        });
    });
});
