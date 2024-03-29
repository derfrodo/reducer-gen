import type { ReduxCodeGeneratorOptions } from "../../interfaces/ReduxCodeGeneratorOptions";
import type { StateInterfaceInfo } from "../../interfaces/StateInterfaceInfo";
import { getDefaultTestStateInfo } from "../../__mocks__/getDefaultTestStateInfo";
import getTemplateModelFactory from "../../__mocks__/getTemplateModelFactoryMock";
import getTemplatingEngineMock from "../../__mocks__/getTemplatingEngineMock";
import { ReducerActionCodesGenerator } from "./ReducerActionCodesGenerator";

jest.mock("./../ReduxModuleNamingHelper");

const getDefaultTestGeneratorOptions = (): ReduxCodeGeneratorOptions => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: ReduxCodeGeneratorOptions = {
        createReducerContext: false,
        addBubbleFlagForActions: true,
    };
    return result;
};

describe("ReducerActionCodesGenerator tests", () => {
    describe("ReduxCodeGenerator.generateMainReducerActionContent tests", () => {
        it("ReduxCodeGenerator.generateMainReducerActionContent returns something", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const {
                mock: templateServiceMock,
                service: templateService,
            } = getTemplatingEngineMock();

            const {
                mock: mfacMock,
                service: modelFactoryService,
            } = getTemplateModelFactory();
            const templateContent = "TESTTEMPLATE";
            (templateServiceMock.reducerActionsTemplates as unknown) = {
                main: templateContent,
            };
            mfacMock.createHandlebarModel.mockImplementation(
                () => "TESTINFO" as any
            );
            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            const clazz = new ReducerActionCodesGenerator(
                options,
                modelFactoryService,
                templateService
            );

            // act
            const result = clazz.generateMainReducerActionContent(state);
            // assert
            expect(mfacMock.createHandlebarModel).toBeCalled();
            expect(templateServiceMock.compile).toBeCalledWith(
                templateContent,
                "TESTINFO"
            );
        });
    });

    describe("ReduxCodeGenerator.generateExtReducerActionContent tests", () => {
        it("ReduxCodeGenerator.generateExtReducerActionContent returns something", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const {
                mock: templateServiceMock,
                service: templateService,
            } = getTemplatingEngineMock();

            const {
                mock: mfacMock,
                service: modelFactoryService,
            } = getTemplateModelFactory();
            const templateContent = "TESTTEMPLATE";
            (templateServiceMock.reducerActionsTemplates as unknown) = {
                extended: templateContent,
            };
            mfacMock.createHandlebarModel.mockImplementation(
                () => "TESTINFO" as any
            );
            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            const clazz = new ReducerActionCodesGenerator(
                options,
                modelFactoryService,
                templateService
            );

            // act
            const result = clazz.generateExtReducerActionContent(state);
            // assert
            expect(mfacMock.createHandlebarModel).toBeCalled();
            expect(templateServiceMock.compile).toBeCalledWith(
                templateContent,
                "TESTINFO"
            );
        });
    });
});
