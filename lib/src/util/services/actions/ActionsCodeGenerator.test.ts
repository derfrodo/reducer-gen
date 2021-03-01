import { ActionsCodeGenerator } from "./ActionsCodeGenerator";

describe("Given ActionsCodeGenerator has been initiated", () => {
    describe("When ActionsCodeGenerator.generateBaseActionContent is called", () => {
        it("ReduxCodeGenerator.generateExtReducerActionContent returns something", async () => {
            // arrange:

            const clazz = new ActionsCodeGenerator();
            // act
            const result = clazz.generateBaseActionContent({
                baseActionsEnumName: "BASE_ACTION_ENUM",
                extendedActionsEnumName: "EXT_ACTION_ENUM",
                mainActionsEnumName: "MAIN_ACTION_NAME",
                actions: ["ACTION1", "ACTION2"],
            });
            // assert
            expect(result).toEqual(``);
        });
    });
});
