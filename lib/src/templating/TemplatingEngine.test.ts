import { HandlebarModel } from "../util/models/HandlebarModel";
import { createTestFactory } from "../util/services/ModelFactory";
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
        it("... and action base template is passed, Then result will match expected string", async () => {
            // arrange:
            const clazz = new TemplatingEngine();

            // act
            await clazz.initialize();
            const result =
                clazz.actionsTemplates &&
                (await clazz.compile(clazz.actionsTemplates.base, {
                    actions: {
                        baseActionsEnumName: "BASE_ACTIONS",
                        extendedActionsEnumName: "EXT_ACTIONS",
                        mainActionsEnumName: "MAIN_ACTIONS",
                        baseActions: ["ACTION1", "ACTION2"],
                    },
                    moduleNames: createTestFactory().createModuleNamesHandlebarModel(),
                } as HandlebarModel));
            // assert
            console.log(typeof result);
            expect(result).toBe(`export enum BASE_ACTIONS {
    ACTION1 = "ACTION1",
    ACTION2 = "ACTION2"
}

export default BASE_ACTIONS;
`);
        });
        it("... and action ext template is passed, Then result will match expected string", async () => {
            // arrange:
            const clazz = new TemplatingEngine();

            // act
            await clazz.initialize();
            const result =
                clazz.actionsTemplates &&
                (await clazz.compile(clazz.actionsTemplates.extended, {
                    actions: {
                        baseActionsEnumName: "BASE_ACTIONS",
                        extendedActionsEnumName: "EXT_ACTIONS",
                        mainActionsEnumName: "MAIN_ACTIONS",
                        baseActions: ["ACTION1", "ACTION2"],
                    },
                    moduleNames: createTestFactory().createModuleNamesHandlebarModel(),
                } as HandlebarModel));
            // assert
            console.log(typeof result);
            expect(result).toBe(`export enum EXT_ACTIONS {
    // e.g. SET_IS_LOGGED_IN_EXT = "SET_IS_LOGGED_IN_EXT",
}

export default EXT_ACTIONS;
`);
        });
        it("... and action main template is passed, Then result will match expected string", async () => {
            // arrange:
            const clazz = new TemplatingEngine();

            // act
            await clazz.initialize();
            const result =
                clazz.actionsTemplates &&
                (await clazz.compile(clazz.actionsTemplates.main, {
                    actions: {
                        baseActionsEnumName: "BASE_ACTIONS",
                        extendedActionsEnumName: "EXT_ACTIONS",
                        mainActionsEnumName: "MAIN_ACTIONS",
                        baseActions: ["ACTION1", "ACTION2"],
                    },
                    moduleNames: createTestFactory().createModuleNamesHandlebarModel(),
                } as HandlebarModel));
            // assert
            console.log(typeof result);
            expect(result).toBe(`import BASE_ACTIONS from "./action.base.generated";
import EXT_ACTIONS from "./action.extended";

export const MAIN_ACTIONS = { ...BASE_ACTIONS, ...EXT_ACTIONS };

export default MAIN_ACTIONS;
`);
        });
    });
});
