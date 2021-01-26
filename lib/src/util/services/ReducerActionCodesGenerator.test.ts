import { ReducerActionCodesGenerator } from "./ReducerActionCodesGenerator";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import { StringHelper } from "@derfrodo/frodo-s-little-helpers/dist";

import ReduxModuleNamingHelper from "./../ReduxModuleNamingHelper";
import ReduxModulFileService from "./../ReduxModulFileService";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import getDefaultTestStateInfo from "../../__mocks__/getDefaultTestStateInfo";
import getReduxModulFileServiceMock from "../../__mocks__/getReduxModulFileServiceMock";
import getReduxModuleNamingHelperMock from "../../__mocks__/getReduxModuleNamingHelperMock";

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
            const moduleNamingHelper = getReduxModuleNamingHelperMock();
            const fsHelper = getReduxModulFileServiceMock();

            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            moduleNamingHelper.mock.getActionStrings.mockImplementation(() => [
                "action1",
                "action2",
            ]);

            moduleNamingHelper.mock.getActionEnumName.mockImplementation(
                () => "ActionsEnum"
            );

            fsHelper.mock.addLevelToImportClause.mockImplementation(
                (input) => input
            );

            fsHelper.mock.getExtensionModulNames.mockImplementation(() => ({
                action: "actionModulName",
                actionCreators: "actionCreatorsModulName",
                reducer: "reducerModulName",
                reducerActions: "reducerActionsModulName",
                defaultState: "defaultStateModulName",
            }));

            fsHelper.mock.getGeneratedModulNames.mockImplementation(() => ({
                action: "action",
                actionCreators: "actionCreators",
                reducer: "reducer",
                reducerActions: "reducerActions",
                defaultState: "defaultState",
                index: "index",
                reducerContext: "ReducerContext",
            }));

            fsHelper.mock.getMainModulNames.mockImplementation(() => ({
                action: "actionMain",
                actionCreators: "actionCreatorsMain",
                reducer: "reducerMain",
                reducerActions: "reducerActionsMain",
                defaultState: "defaultStateMain",
                index: "indexMain",
                reducerContext: "ReducerContextMain",
            }));

            moduleNamingHelper.mock.getReducerActionName.mockImplementation(
                (_, type) => `ReducerTestAction.${type}`
            );

            moduleNamingHelper.mock.getReducerActionTypeGuardMethodName.mockImplementation(
                (_, type) => `ReducerTestActionTypeGuard.${type}`
            );
            const clazz = new ReducerActionCodesGenerator(
                options,
                moduleNamingHelper.service,
                fsHelper.service
            );
            // act
            const result = clazz.generateMainReducerActionContent(state);
            // assert
            expect(result)
                .toEqual(`import ReducerTestAction.base, { ReducerTestActionTypeGuard.base } from "./reducerActions";
import ReducerTestAction.ext, { ReducerTestActionTypeGuard.ext } from "./reducerActionsModulName";

export type ReducerTestAction.main = ReducerTestAction.base | ReducerTestAction.ext;

export const ReducerTestActionTypeGuard.main = (item: any): item is ReducerTestAction.main => {
    return ReducerTestActionTypeGuard.base(item) || ReducerTestActionTypeGuard.ext(item);
}

export default ReducerTestAction.main;
`);
        });
    });

    describe("ReduxCodeGenerator.generateExtReducerActionContent tests", () => {
        it("ReduxCodeGenerator.generateExtReducerActionContent returns something", async () => {
            // arrange:
            const options = { ...getDefaultTestGeneratorOptions() };
            const moduleNamingHelper = getReduxModuleNamingHelperMock();
            const fsHelper = getReduxModulFileServiceMock();

            const state: StateInterfaceInfo = getDefaultTestStateInfo();

            moduleNamingHelper.mock.getActionStrings.mockImplementation(() => [
                "action1",
                "action2",
            ]);

            moduleNamingHelper.mock.getActionEnumName.mockImplementation(
                () => "ActionsEnum"
            );

            fsHelper.mock.addLevelToImportClause.mockImplementation(
                (input) => input
            );
            fsHelper.mock.addCommentToImportClause.mockImplementation(
                (input) => `// ${input}`
            );

            fsHelper.mock.getExtensionModulNames.mockImplementation(() => ({
                action: "actionModulName",
                actionCreators: "actionCreatorsModulName",
                reducer: "reducerModulName",
                reducerActions: "reducerActionsModulName",
                defaultState: "defaultStateModulName",
            }));

            fsHelper.mock.getGeneratedModulNames.mockImplementation(() => ({
                action: "action",
                actionCreators: "actionCreators",
                reducer: "reducer",
                reducerActions: "reducerActions",
                defaultState: "defaultState",
                index: "index",
                reducerContext: "ReducerContext",
            }));

            fsHelper.mock.getMainModulNames.mockImplementation(() => ({
                action: "actionMain",
                actionCreators: "actionCreatorsMain",
                reducer: "reducerMain",
                reducerActions: "reducerActionsMain",
                defaultState: "defaultStateMain",
                index: "indexMain",
                reducerContext: "ReducerContextMain",
            }));

            moduleNamingHelper.mock.getReducerActionName.mockImplementation(
                (_, type) => `ReducerTestAction.${type}`
            );

            moduleNamingHelper.mock.getReducerActionTypeGuardMethodName.mockImplementation(
                (_, type) => `ReducerTestActionTypeGuard.${type}`
            );
            const clazz = new ReducerActionCodesGenerator(
                options,
                moduleNamingHelper.service,
                fsHelper.service
            );
            // act
            const result = clazz.generateExtReducerActionContent(state);
            // assert
            expect(result).toEqual(`// import1
// import2
import extenededActions from "./../actions/actionModulName";
        
/**
 * You may add here extending reducer actions for this features reducer
 */        
export type ReducerTestAction.ext = { type: extenededActions; isBubbled?: boolean } & (
    | {} // replace by following template for every extenededActions
//    | {
//        type: extenededActions["[action name]"];
//        /* [additional payload like : next:  boolean;]*/
//    }
);

export const ReducerTestActionTypeGuard.ext = (item: any): item is ReducerTestAction.ext => {
    if (!item) { return false; }
    if (typeof item === "object") {
        const { type } = item;

        return typeof type === "string" && extenededActions.hasOwnProperty(type);
    }
    return false;
}

export default ReducerTestAction.ext;
`);
        });
    });
});
