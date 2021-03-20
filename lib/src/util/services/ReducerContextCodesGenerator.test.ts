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
                actions: "actionModulName",
                actionCreators: "actionCreatorsModulName",
                reducer: "reducerModulName",
                reducerActions: "reducerActionsModulName",
                defaultState: "defaultStateModulName",
            }));

            fsHelper.mock.getGeneratedModulNames.mockImplementation(() => ({
                actions: "action",
                actionCreators: "actionCreators",
                reducer: "reducer",
                reducerActions: "reducerActions",
                defaultState: "defaultState",
                index: "index",
                reducerContext: "ReducerContext",
            }));

            fsHelper.mock.getMainModulNames.mockImplementation(() => ({
                actions: "actionMain",
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
            expect(result).toEqual(`import React, { useCallback, useEffect, useRef, useState } from "react";
import state from "./state";
import undefined from "./reducer/reducerMain";
import ReducerTestAction.main from "./reducerActions/reducerActionsMain";
import undefined from "./defaultState";

export type OnundefinedContextDispatchWillBeCalled = (action: ReducerTestAction.main) => void;

export interface IundefinedContext {
    state: undefined;
    dispatch: React.Dispatch<ReducerTestAction.main>;
    listenOnDispatchWillBeCalled: (callback: OnundefinedContextDispatchWillBeCalled) => void;
    removeOnDispatchWillBeCalled: (callback: OnundefinedContextDispatchWillBeCalled) => void;
}

export type IDispatchundefinedContext = React.Dispatch<ReducerTestAction.main>;

export type IStateundefinedContext = undefined;

export const undefinedContext = React.createContext<IundefinedContext>({
    state: undefined(),
    dispatch: () => undefined,
    listenOnDispatchWillBeCalled: () => undefined,
    removeOnDispatchWillBeCalled: () => undefined,
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


    const dispatchWillBeCalledCallbacks = useRef<
        OnundefinedContextDispatchWillBeCalled[]
    >([]);

    const listenOnDispatchWillBeCalled = useCallback(
        (callback: OnundefinedContextDispatchWillBeCalled) => {
            if (!dispatchWillBeCalledCallbacks.current) {
                dispatchWillBeCalledCallbacks.current = [callback];
            } else if (
                dispatchWillBeCalledCallbacks.current.filter(
                    (item) => item === callback
                ).length === 0
            ) {
                dispatchWillBeCalledCallbacks.current.push(callback);
            }
        },
        []
    );

    const removeOnDispatchWillBeCalled = useCallback(
        (callback: OnundefinedContextDispatchWillBeCalled) => {
            if (!dispatchWillBeCalledCallbacks.current) {
                dispatchWillBeCalledCallbacks.current = [callback];
            } else if (
                dispatchWillBeCalledCallbacks.current.filter(
                    (item) => item === callback
                ).length !== 0
            ) {
                dispatchWillBeCalledCallbacks.current = dispatchWillBeCalledCallbacks.current.filter(
                    (item) => item !== callback
                );
            }
        },
        []
    );

    const dispatchCallback = useCallback<typeof dispatch>((...args) => {
        const callbacks = dispatchWillBeCalledCallbacks.current;
        for (const cb of callbacks || []) {
            cb(args[0]);
        }
        dispatch(...args);
    }, []);

    const context: IundefinedContext = React.useMemo(
        () => ({
            state,
            dispatch: dispatchCallback,
            listenOnDispatchWillBeCalled,
            removeOnDispatchWillBeCalled,
        }),
        [
            state,
            dispatchCallback,
            listenOnDispatchWillBeCalled,
            removeOnDispatchWillBeCalled,
        ]
    );

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

/**
 * Use this method if you want to react on dispatch calls (e.g. call additional methods or talk to a... frame?)
 * @param callback callback which will be called dispatch gets called
 */
export const useundefinedDispatchWillBeCalledEffect = (callback: OnundefinedContextDispatchWillBeCalled) => {
    const {
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    } = useundefinedContext();

    useEffect(() => {
        if(callback){
            listenOnDispatchWillBeCalled(callback)
            return () => {
                removeOnDispatchWillBeCalled(callback)
            }
        }
    }, [callback, listenOnDispatchWillBeCalled, removeOnDispatchWillBeCalled]);
};

/**
 * Use this method if you want to react on state changes (e.g. call additional methods or talk to a... frame?)
 * @param onStateChanged callback which will be called if undefinedState changes
 */
export const useundefinedStateChangedEffect = <T extends IState>(
    onStateChanged: (next: undefined, old: undefined | null) => Promise<void> | void
) => {
    const state = useundefinedContextState();

    const callbackRef = useRef<typeof onStateChanged>(onStateChanged);
    const [, setOld] = useState<IState | null>(null);

    useEffect(() => {
        callbackRef.current = onStateChanged;
    }, [onStateChanged]);

    useEffect(() => {
        setOld((prev) => {
            if (callbackRef.current && state !== prev) {
                callbackRef.current(state, prev);
            }
            return state;
        });
    }, [state]);
};

/**
 * Use this method if you want to react on state changes concerning a specific property
 * @param property property which is to be watched
 * @param onStatePropertyChanged callback which will be called if property in state changes
 */
export const useundefinedStatePropertyChangedEffect = <
    TKey extends keyof IState
>(
    property: TKey,
    onStatePropertyChanged: (
        next: IState[TKey],
        old: IState[TKey] | null,
        state: IState,
        oldState: IState | null
    ) => Promise<void> | void
) => {
    const callbackRef = useRef<typeof onStatePropertyChanged>(
        onStatePropertyChanged
    );

    useEffect(() => {
        callbackRef.current = onStatePropertyChanged;
    }, [onStatePropertyChanged]);

    const changedCallback = useCallback(
        async (next: IState, old: IState | null) => {
            const cb = callbackRef.current;
            if (cb && (!old || next[property] !== old[property])) {
                await cb(
                    next[property],
                    old !== null ? old[property] : null,
                    next,
                    old
                );
            }
        },
        [property]
    );

    useundefinedStateChangedEffect(changedCallback);
};
`);
        });
    });
});
