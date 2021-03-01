import { TemplatingEngine } from "./TemplatingEngine";

describe("Given TemplatingEngine", () => {
    it("When TemplatingEngine.precompile is called, Then actions templates will be filled", async () => {
        // arrange:
        const clazz = new TemplatingEngine();

        // act
        await clazz.precompile();

        // assert
        expect(clazz.actionsTemplates.base).not.toBeUndefined();
    });
    it("When TemplatingEngine.precompile is called, Then actions templates will be filled", async () => {
        // arrange:
        const clazz = new TemplatingEngine();

        // act
        await clazz.precompile();

        // assert
        expect(clazz.actionsTemplates.base).not.toBeUndefined();
    });
});
