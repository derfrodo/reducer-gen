import ReduxCodeGeneratorOptions from "../interfaces/ReduxCodeGeneratorOptions";
import type { StateInterfaceInfo } from "../interfaces/StateInterfaceInfo";
import { getDefaultTestStateInfo } from "../__mocks__/getDefaultTestStateInfo";
import { getTemplateModelFactory } from "../__mocks__/getTemplateModelFactoryMock";
import getReducerContextCodesGeneratorMock from "../__mocks__/getReducerContextCodesGeneratorMock";
import getReduxModuleNamingHelperMock from "../__mocks__/getReduxModuleNamingHelperMock";
import getReduxModulFileServiceMock from "../__mocks__/getReduxModulFileServiceMock";
import { getTemplatingEngineMock } from "../__mocks__/getTemplatingEngineMock";
import { ReduxCodeGenerator } from "./ReduxCodeGenerator";

jest.mock("./ReduxModuleNamingHelper");
jest.mock("./../templating/TemplatingEngine");
jest.mock("./../util/services/TemplateModelFactory");

const getDefaultTestGeneratorOptions = (): ReduxCodeGeneratorOptions => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: ReduxCodeGeneratorOptions = {
        createReducerContext: false,
    };
    return result;
};

describe("ReduxCodeGenerator tests", () => {
    describe("ReduxCodeGenerator.generateBaseActionContent tests", () => {
        it("ReduxCodeGenerator.generateBaseActionContent returns something", async () => {
            // arrange:
            const {
                mock: templateServiceMock,
                service: templateService,
            } = getTemplatingEngineMock();

            const {
                mock: mfacMock,
                service: modelFactoryService,
            } = getTemplateModelFactory();
            const templateContent = "TESTTEMPLATE";
            (templateServiceMock.actionsTemplates as unknown) = {
                base: templateContent,
            };
            mfacMock.createHandlebarModel.mockImplementation(
                () => "TESTINFO" as any
            );

            const clazz = new ReduxCodeGenerator(
                undefined,
                undefined,
                undefined,
                undefined,
                modelFactoryService,
                templateService,
                undefined,
                undefined,
                undefined,
                undefined
            );

            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            // act
            const result = clazz.generateBaseActionContent(state);

            // assert
            expect(mfacMock.createHandlebarModel).toBeCalled();
            expect(templateServiceMock.compile).toBeCalledWith(
                templateContent,
                "TESTINFO"
            );
        });
    });
    describe("ReduxCodeGenerator.generateBaseActionsCreatorContent tests", () => {
        it("ReduxCodeGenerator.generateBaseActionsCreatorContent returns something", async () => {
            // arrange:
            const {
                mock: templateServiceMock,
                service: templateService,
            } = getTemplatingEngineMock();

            const {
                mock: mfacMock,
                service: modelFactoryService,
            } = getTemplateModelFactory();
            const templateContent = "TESTTEMPLATE";
            (templateServiceMock.actionCreatorsTemplates as unknown) = {
                base: templateContent,
            };
            mfacMock.createHandlebarModel.mockImplementation(
                () => "TESTINFO" as any
            );

            const clazz = new ReduxCodeGenerator(
                undefined,
                undefined,
                undefined,
                undefined,
                modelFactoryService,
                templateService,
                undefined,
                undefined,
                undefined,
                undefined
            );

            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            // act
            const result = clazz.generateBaseActionsCreatorContent(state);

            // assert
            expect(mfacMock.createHandlebarModel).toBeCalled();
            expect(templateServiceMock.compile).toBeCalledWith(
                templateContent,
                "TESTINFO"
            );
        });
    });
    describe("ReduxCodeGenerator.generateMainReducerContextContent tests", () => {
        it("ReduxCodeGenerator.generateMainReducerContextContent calls internal service", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const fsHelper = getReduxModulFileServiceMock();
            const contextGen = getReducerContextCodesGeneratorMock();
            const moduleNamingHelper = getReduxModuleNamingHelperMock();

            const clazz = new ReduxCodeGenerator(
                options,
                undefined,
                moduleNamingHelper.service,
                fsHelper.service,
                undefined,
                undefined,
                undefined,
                undefined,
                contextGen.service
            );
            const state: StateInterfaceInfo = getDefaultTestStateInfo();
            contextGen.mock.generateReducerContextContent.mockImplementation(
                () => "someTestResult"
            );

            // act
            const result = clazz.generateMainReducerContextContent(state);

            expect(result).toBe("someTestResult");
            expect(
                contextGen.mock.generateReducerContextContent
            ).toBeCalledTimes(1);
        });
    });
});
