import { ReduxModuleNamingHelperOptions } from "../interfaces/ReduxModuleNamingHelperOptions";
import { ReduxModuleNamingHelper } from "./ReduxModuleNamingHelper";

describe("ReduxModuleNamingHelper tests", () => {
    describe("ReduxModuleNamingHelper.getDoNotOverwriteWarning", () => {
        it("ReduxModuleNamingHelper.getDoNotOverwriteWarning returns js comment", async () => {
            // arrange:
            const testoptions: ReduxModuleNamingHelperOptions = {
                addFeatureAsActionPrefix: true,
            };

            const clazz = new ReduxModuleNamingHelper(testoptions, undefined);

            // act
            const result = clazz.getDoNotOverwriteWarning();

            // assert
            expect(result).toMatch(/(\/\/.*$)|(\n$)/g);
        });
    });

    describe("ReduxModuleNamingHelper.getGeneralGenertedFileInformation", () => {
        it("ReduxModuleNamingHelper.getGeneralGenertedFileInformation returns js comment", async () => {
            // arrange:
            const testoptions: ReduxModuleNamingHelperOptions = {
                addFeatureAsActionPrefix: true,
            };

            const clazz = new ReduxModuleNamingHelper(testoptions, undefined);

            // act
            const result = clazz.getGeneralGenertedFileInformation();

            // assert
            expect(result).toMatch(/(\/\/.*$)|(\n$)/g);
        });
    });
});
