import { getDefaultReduxCodeGeneratorOptions } from "../../interfaces/ReduxCodeGeneratorOptions";
import { getDefaultReduxModuleNamingHelperOptions } from "../../interfaces/ReduxModuleNamingHelperOptions";
import { getDefaultReduxModulFileServiceOptions } from "../../interfaces/ReduxModulFileServiceOptions";
import { ReduxModuleNamingHelper } from "../ReduxModuleNamingHelper";
import { ReduxModulFileService } from "../ReduxModulFileService";
import { StateService } from "./StateService";
import { TemplateModelFactory } from "./TemplateModelFactory";

jest.mock("../ReduxModuleNamingHelper");
jest.mock("../ReduxModulFileService");
jest.mock("./StateService");

describe("TemplateModelFactory tests", () => {
    describe("TemplateModelFactory.addLevelToImportClause tests", () => {
        it("TemplateModelFactory.addLevelToImportClause returns something", async () => {
            // arrange:
            console.log(typeof ReduxModuleNamingHelper);

            const mockNamingHelper = new ReduxModuleNamingHelper(
                getDefaultReduxModuleNamingHelperOptions(),
                null
            );
            const mocReduxModulFileService = new ReduxModulFileService(
                getDefaultReduxModulFileServiceOptions()
            );
            const mocStateService = new StateService();

            const uut = new TemplateModelFactory(
                mockNamingHelper,
                mocReduxModulFileService,
                getDefaultReduxCodeGeneratorOptions(),
                mocStateService
            );

            // act
            const result = uut.addLevelToImportClause("SOMECLAUSE");

            // assert
            expect(result).toBe("SOMECLAUSE");
        });
    });
});
