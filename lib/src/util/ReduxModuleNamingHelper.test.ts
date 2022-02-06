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

    describe("ReduxModuleNamingHelper.addGeneratedHeader", () => {
        it("ReduxModuleNamingHelper.addGeneratedHeader returns adds generator File info", async () => {
            // arrange:
            const testoptions: ReduxModuleNamingHelperOptions = {
                addFeatureAsActionPrefix: true,
            };

            const clazz = new ReduxModuleNamingHelper(testoptions, undefined);
            const startFileLine = clazz.getGeneralGenertedFileInformation();
            const overwriteWarning = clazz.getDoNotOverwriteWarning();

            // act
            const result = clazz.addGeneratedHeader("TESTCONTENT");

            // assert
            expect(result).toMatch(/((\/\/.*$)|(\n$))*TESTCONTENT/);
            expect(result.indexOf(startFileLine)).toBeGreaterThan(-1);
            expect(result.indexOf(overwriteWarning)).toBeGreaterThan(-1);
        });
        it("ReduxModuleNamingHelper.addGeneratedHeader returns adds generator File info and omits 'do not overwrite info'", async () => {
            // arrange:
            const testoptions: ReduxModuleNamingHelperOptions = {
                addFeatureAsActionPrefix: true,
            };

            const clazz = new ReduxModuleNamingHelper(testoptions, undefined);
            const startFileLine = clazz.getGeneralGenertedFileInformation();
            const overwriteWarning = clazz.getDoNotOverwriteWarning();

            // act
            const result = clazz.addGeneratedHeader("TESTCONTENT", true);

            // assert
            expect(result).toMatch(/((\/\/.*$)|(\n$))*TESTCONTENT/);
            expect(result.indexOf(startFileLine)).toBeGreaterThan(-1);
            expect(result.indexOf(overwriteWarning)).toBeLessThan(0);
        });
    });

    describe("ReduxModuleNamingHelper.getFeatureName", () => {
        it("ReduxModuleNamingHelper.getFeatureName returns name of feature", async () => {
            // arrange:
            const testoptions: ReduxModuleNamingHelperOptions = {
                addFeatureAsActionPrefix: true,
            };

            const clazz = new ReduxModuleNamingHelper(testoptions, undefined);

            // act
            const result = clazz.getFeatureName({
                featureData: { featureName: "TESTFEATURE" } as any,
            } as any);

            // assert
            expect(result).toBe("TESTFEATURE");
        });
    });
    describe("ReduxModuleNamingHelper.getActionStrings", () => {
        it("ReduxModuleNamingHelper.getActionStrings action strings with prefix if option is true", async () => {
            // arrange:
            const testoptions: ReduxModuleNamingHelperOptions = {
                addFeatureAsActionPrefix: true,
            };

            const clazz = new ReduxModuleNamingHelper(testoptions, undefined);

            // act
            const result = clazz.getActionStrings({
                stateProperties: [
                    { name: "Testp1" },
                    { name: "Testp2" },
                ] as any,
                featureData: { featureName: "TESTFEATURE" } as any,
            } as any);

            // assert
            expect(result).toEqual([
                "TESTFEATURE_SET_TESTP1",
                "TESTFEATURE_SET_TESTP2",
            ]);
        });

        it("ReduxModuleNamingHelper.getActionStrings action strings without prefix if option is false", async () => {
            // arrange:
            const testoptions: ReduxModuleNamingHelperOptions = {
                addFeatureAsActionPrefix: false,
            };

            const clazz = new ReduxModuleNamingHelper(testoptions, undefined);

            // act
            const result = clazz.getActionStrings({
                stateProperties: [
                    { name: "Testp1" },
                    { name: "Testp2" },
                ] as any,
                featureData: { featureName: "TESTFEATURE" } as any,
            } as any);

            // assert
            expect(result).toEqual(["SET_TESTP1", "SET_TESTP2"]);
        });
    });
});
