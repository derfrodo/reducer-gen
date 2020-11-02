import { StringHelper } from "@derfrodo/frodo-s-little-helpers/dist";
import ReduxCodeGeneratorOptions from "../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../interfaces/StateInterfaceInfo";
import getDefaultTestStateInfo from "../__mocks__/getDefaultTestStateInfo";
import getReduxModuleNamingHelperMock from "../__mocks__/getReduxModuleNamingHelperMock";
import getReduxModulFileServiceMock from "../__mocks__/getReduxModulFileServiceMock";
import getReducerContextCodesGeneratorMock from "../__mocks__/getReducerContextCodesGeneratorMock";
import { ReduxCodeGenerator } from "./ReduxCodeGenerator";
import ReduxModulFileService from "./ReduxModulFileService";

jest.mock("./ReduxModuleNamingHelper");

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
            const options = { ...getDefaultTestGeneratorOptions() };
            const moduleNamingHelper = getReduxModuleNamingHelperMock();

            const clazz = new ReduxCodeGenerator(
                options,
                moduleNamingHelper.service,
                new (ReduxModulFileService as any)(),
                new StringHelper()
            );
            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            moduleNamingHelper.mock.getActionStrings.mockImplementation(() => [
                "action1",
                "action2",
            ]);

            moduleNamingHelper.mock.getActionEnumName.mockImplementation(
                () => "ActionsEnum"
            );

            // act
            const result = clazz.generateBaseActionContent(state);

            // assert
            expect(result).toEqual(`export enum ActionsEnum {
    action1 = "action1",
    action2 = "action2",
}

export default ActionsEnum;
`);
        });
    });
    describe("ReduxCodeGenerator.generateBaseActionsCreatorContent tests", () => {
        it("ReduxCodeGenerator.generateBaseActionsCreatorContent returns something", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const fsHelper = getReduxModulFileServiceMock();
            const moduleNamingHelper = getReduxModuleNamingHelperMock();

            const clazz = new ReduxCodeGenerator(
                options,
                moduleNamingHelper.service,
                fsHelper.service,
                new StringHelper()
            );
            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            moduleNamingHelper.mock.getActionString.mockImplementation(
                () => "anAction"
            );
            moduleNamingHelper.mock.getActionCreatorsName.mockImplementation(
                () => "ActionsCreator"
            );
            fsHelper.mock.addLevelToImportClause.mockImplementation(
                (input) => input
            );

            fsHelper.mock.getGeneratedModulNames.mockImplementation(() => ({
                action: "action",
                actionCreators: "actionCreators",
                reducer: "reducer",
                reducerActions: "reducerActions",
                defaultState: "defaultState",
                index: "index",
                reducerContext: "ReducerContext",
            }));

            // act
            const result = clazz.generateBaseActionsCreatorContent(state);

            // console .log(result)
            // assert
            expect(result).toEqual(`import1
import2
import ReducerAction from "./../reducerActions/reducerActions";
import actions from "./../actions/action";

export const ActionsCreator = {
    setProperty1: (nextProperty1: null|string[]): ReducerAction => (
        {
            type: actions.anAction,
            next: nextProperty1,
        }),
    setAnotherProperty: (nextAnotherProperty: undefined|string[]): ReducerAction => (
        {
            type: actions.anAction,
            next: nextAnotherProperty,
        }),
    setAnotherProperty2: (nextAnotherProperty2: string): ReducerAction => (
        {
            type: actions.anAction,
            next: nextAnotherProperty2,
        }),        
}

export default ActionsCreator;
`);
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
                moduleNamingHelper.service,
                fsHelper.service,
                new StringHelper(),
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
