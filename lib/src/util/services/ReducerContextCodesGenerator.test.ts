import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import getDefaultTestStateInfo from "../../__mocks__/getDefaultTestStateInfo";
import getReduxModuleNamingHelperMock from "../../__mocks__/getReduxModuleNamingHelperMock";
import getReduxModulFileServiceMock from "../../__mocks__/getReduxModulFileServiceMock";
import { ReducerContextCodesGenerator } from "./ReducerContextCodesGenerator";

jest.mock("./../ReduxModuleNamingHelper");

const getDefaultTestGeneratorOptions = (): ReduxCodeGeneratorOptions => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: ReduxCodeGeneratorOptions = {
        createReducerContext: false,
    };
    return result;
};

describe("ReducerContextCodesGenerator tests", () => {
    describe("ReducerContextCodesGenerator.generateReducerContextProviderContent tests", () => {
        it("ReduxCodeGenerator.generateReducerContextProviderContent returns something", async () => {
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

            moduleNamingHelper.mock.getStateInterfaceImportLine.mockImplementation(
                (_, type) => `import state from "./state";`
            );
            moduleNamingHelper.mock.getReducerActionTypeGuardMethodName.mockImplementation(
                (_, type) => `ReducerTestActionTypeGuard.${type}`
            );
            const clazz = new ReducerContextCodesGenerator(
                options,
                moduleNamingHelper.service,
                fsHelper.service
            );
            // act
            const result = clazz.generateReducerContextContent(state);
            // console.log(result);
            // assert
            expect(result).toEqual(`import React from "react";
import state from "./state";
import undefined from "./reducer/reducerMain";
import ReducerTestAction.main from "./reducerActions/reducerActionsMain";
import undefined from "./defaultState";

export interface IundefinedContext {
    state: undefined;
    dispatch: React.Dispatch<ReducerTestAction.main>;
}

export type IDispatchundefinedContext = React.Dispatch<ReducerTestAction.main>;

export type IStateundefinedContext = undefined;

export const undefinedContext = React.createContext<IundefinedContext>({
    state: undefined(),
    dispatch: () => undefined,
});

export const DispatchundefinedContext = React.createContext<IDispatchundefinedContext>(() => undefined);

export const StateundefinedContext = React.createContext<IStateundefinedContext>(undefined());

export const undefinedContextProvider = (props: {
    children: React.ReactNode;
}) => {
    const { children } = props;

    const [state, dispatch] = React.useReducer(
    undefined,
    undefined,
    undefined
    );

    const context: {
    state: undefined;
    dispatch: React.Dispatch<ReducerTestAction.main>;
    } = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
    <DispatchundefinedContext.Provider value={dispatch}>
        <StateundefinedContext.Provider value={state}>
            <undefinedContext.Provider value={context}>
                {children}
            </undefinedContext.Provider>
        </StateundefinedContext.Provider>
    </DispatchundefinedContext.Provider>
    );
};

export const useundefinedContext: () => IundefinedContext = () => {
    return React.useContext<IundefinedContext>(undefinedContext);
};

export const useundefinedContextState: () => IStateundefinedContext = () => {
    return React.useContext<IStateundefinedContext>(StateundefinedContext);
};

export const useundefinedContextDispatch: () => IDispatchundefinedContext = () => {
    return React.useContext<IDispatchundefinedContext>(DispatchundefinedContext);
};
`);
        });
    });
});
