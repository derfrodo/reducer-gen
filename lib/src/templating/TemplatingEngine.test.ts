import { getTestModel } from "../util/models/test/getTestModel";
import { TemplatingEngine } from "./TemplatingEngine";

describe("Given TemplatingEngine", () => {
    describe("When TemplatingEngine.precompile is called", () => {
        it(", Then actions templates will be filled", async () => {
            // arrange:
            const clazz = new TemplatingEngine();

            // act
            await clazz.initialize();

            // assert
            expect(clazz.actionsTemplates.base).not.toBeUndefined();
        });
    });

    describe("When TemplatingEngine.compile is called", () => {
        describe("... and compilation will be for actions", () => {
            it("... and action base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionsTemplates &&
                    (await clazz.compile(
                        clazz.actionsTemplates.base,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`export enum BASE_ACTIONS {
    ACTION1 = "ACTION1",
    ACTION2 = "ACTION2",
}

export default BASE_ACTIONS;
`);
            });
            it("... and action ext template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionsTemplates &&
                    (await clazz.compile(
                        clazz.actionsTemplates.extended,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`export enum EXT_ACTIONS {
    // e.g. ADD_LOADING_HANDLE = "ADD_LOADING_HANDLE",
}

export default EXT_ACTIONS;
`);
            });
            it("... and action main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionsTemplates &&
                    (await clazz.compile(
                        clazz.actionsTemplates.main,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { BASE_ACTIONS } from "./actions.base.generated";
import { EXT_ACTIONS } from "./actions.extended";

export const MAIN_ACTIONS = { ...BASE_ACTIONS, ...EXT_ACTIONS };

export default MAIN_ACTIONS;
`);
            });
        });
        describe("... and compilation will be for actionCreators", () => {
            it("... and actioncreators main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.actionCreatorsTemplates.main,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { CREATOR_BASE } from "./actionCreators.base.generated";
import { CREATOR_EXT } from "./actionCreators.extended";

export const CREATOR_MAIN = { ...CREATOR_BASE, ...CREATOR_EXT };

export default CREATOR_MAIN;
`);
            });

            it("... and actioncreators base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.actionCreatorsTemplates.base,
                        testModel
                    ));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import test from "with additional level"
import test from "with additional level2"
import { BASE_REDUCERACTIONS as ReducerActions } from "./../reducerActions/reducerActions.base.generated";
import { MAIN_ACTIONS as actions } from "./../actions/actions.main.generated";

export const CREATOR_BASE = {
    setProp1: (nextProp1: object): ReducerActions => ({
        type: actions.SET_P1,
        next: nextProp1,
    }),
    setProp2: (nextProp2: string | undefined): ReducerActions => ({
        type: actions.SET_P2,
        next: nextProp2,
    }),
};

export default CREATOR_BASE;
`);
            });

            it("... and actioncreators extended template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.actionCreatorsTemplates.extended,
                        testModel
                    ));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`// Uncomment imports if you need to ;)
// import test from "with additional level"
// import test from "with additional level2"

import { EXTENDED_REDUCERACTIONS } from "./../reducerActions/reducerActions.extended";
// import { EXT_ACTIONS } from "./../actions/actions.extended";

/**
 * You may add here extending actionCreators for this features reducer
 * actionCreator: ([params]): ExtenedReducerAction => (
 * {
 *   type: EXT_ACTIONS["[actionName]"],
 *   [payload]
 * }),
 */
const extendedActionCreators = {
    // Add functions like
    // addLoadingHandle: (handleToAdd: symbol) => {
    //    return {
    //        type: EXT_ACTIONS.ADD_LOADING_HANDLE,
    //        handle: handleToAdd
    //        };
    //    },
}

// Start: This is just for typechecking, so that you can utilize the awesomeness of Typescript
type ActionCreator = { [key in string]: (...params: any[]) => EXTENDED_REDUCERACTIONS };

const checkActionCreator: <T>(item: T & ActionCreator) => T = <T>(item: T & ActionCreator) => {
    return item;
};
// End (The function above will be used to create the named export below)

export const CREATOR_EXT = checkActionCreator(extendedActionCreators);

export default CREATOR_EXT;
`);
            });
        });
        describe("... and compilation will be for reducerActions", () => {
            it("... and reducerActions base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerActionsTemplates &&
                    (await clazz.compile(
                        clazz.reducerActionsTemplates.base,
                        testModel
                    ));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import test from "with additional level"
import test from "with additional level2"
import { BASE_ACTIONS as actions } from "./../actions/actions.base.generated";

export type BASE_REDUCERACTIONS = {
    type: actions;
    isBubbled?: boolean;
    } & (
    | {
        type: actions.SET_P1;
        next: object;
    }
    | {
        type: actions.SET_P2;
        next: string | undefined;
    }
);

export const isBaseTestReducer = (
    item: any
): item is BASE_REDUCERACTIONS => {
    if (!item) {
        return false;
    }
    if (typeof item === "object") {
        const { type } = item;

        return (
            typeof type === "string" &&
            Object.hasOwnProperty.call(actions, type)
        );
    }
    return false;
};

export default BASE_REDUCERACTIONS;
`);
            });
            it("... and reducerActions extended template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerActionsTemplates &&
                    (await clazz.compile(
                        clazz.reducerActionsTemplates.extended,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { EXT_ACTIONS as extendedActions } from "./../actions/actions.extended";

/**
 * You may add here extending reducer actions for this features reducer
 */
export type EXTENDED_REDUCERACTIONS = {
    type: extendedActions;
    isBubbled?: boolean;
} & {
    // replace by following template for every extendedActions
    //    | {
    //        type: extendedActions["[action name]"];
    //        /* [additional payload like : next:  boolean;]*/
    //    }
};

export const isExtendedTestReducer = (
    item: any
): item is EXTENDED_REDUCERACTIONS => {
    if (!item) {
        return false;
    }
    if (typeof item === "object") {
        const { type } = item;

        return (
            typeof type === "string" &&
            Object.hasOwnProperty.call(extendedActions, type)
        );
    }
    return false;
};

export default EXTENDED_REDUCERACTIONS;
`);
            });
            it("... and reducerActions main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerActionsTemplates &&
                    (await clazz.compile(
                        clazz.reducerActionsTemplates.main,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { BASE_REDUCERACTIONS, isBaseTestReducer } from "./reducerActions.base.generated";
import { EXTENDED_REDUCERACTIONS, isExtendedTestReducer } from "./reducerActions.extended";

export type MAIN_REDUCERACTIONS = BASE_REDUCERACTIONS | EXTENDED_REDUCERACTIONS;

export const isMainTestReducer = (item: any): item is MAIN_REDUCERACTIONS => {
    return isBaseTestReducer(item) || isExtendedTestReducer(item);
}

export default MAIN_REDUCERACTIONS;
`);
            });
        });
        describe("... and compilation will be for reducer", () => {
            it("... and reducer base template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerTemplates &&
                    (await clazz.compile(
                        clazz.reducerTemplates.base,
                        testModel
                    ));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { TESTSTATE } from "./../state";
import { getTestStateDefault } from "./../defaultState.base.generated";
import { BASE_ACTIONS as actions } from "./../actions/actions.base.generated";
import { BASE_REDUCERACTIONS } from "./../reducerActions/reducerActions.base.generated";

export const baseTestReducer = (state: TESTSTATE = getTestStateDefault(), action: BASE_REDUCERACTIONS): TESTSTATE => {
    switch (action.type) {
        case actions.SET_P1:
            return {
                ...state,
                prop1: action.next,
            };
        case actions.SET_P2:
            return {
                ...state,
                prop2: action.next,
            };
        default:
            return state;
    }
};

export default baseTestReducer;
`);
            });
            it("... and reducer extended template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerTemplates &&
                    (await clazz.compile(
                        clazz.reducerTemplates.extended,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { TESTSTATE } from "./../state";
import { getTestStateDefault } from "./../defaultState.base.generated";
import { MAIN_REDUCERACTIONS } from "./../reducerActions/reducerActions.main.generated";

// import test from "with additional level"
// import test from "with additional level2"

// import { BASE_ACTIONS as actions } from "./../actions/actions.base.generated";
// import { EXT_ACTIONS as actions } from "./../actions/actions.extended";

// Uncomment for some typechecking:
// import { isExtendedTestReducer } from "./../reducerActions/reducerActions.extended";
// import { isBaseTestReducer } from "./../reducerActions/reducerActions.base.generated";

export const extendedTestReducer = (state: TESTSTATE = getTestStateDefault(), action: MAIN_REDUCERACTIONS): TESTSTATE => {
    switch (action.type) {
        //         case actions["[actionName]"]:
        //             return {
        //                 ...state,
        //                 // [action payload]
        //            };
        //         case extendedActions["[actionName]"]:
        //             return {
        //                 ...state,
        //                 // [action payload]
        //              };
        default:
            return state;
    }
};

export default extendedTestReducer;
`);
            });
            it("... and reducer main template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.reducerTemplates &&
                    (await clazz.compile(
                        clazz.reducerTemplates.main,
                        testModel
                    ));
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { TESTSTATE } from "./../state";
import { getTestStateDefault } from "./../defaultState.base.generated";
import { baseTestReducer } from "./reducer.base.generated";
import { extendedTestReducer } from "./reducer.extended";
import { isBaseTestReducer } from "./../reducerActions/reducerActions.base.generated";
import { isMainTestReducer } from "./../reducerActions/reducerActions.main.generated";

export const mainTestReducer = (state: TESTSTATE = getTestStateDefault(), action: any): TESTSTATE => {
    // Note: Generator may be extended to inversify this order => Just talk to me ;)
    // return extendedTestReducer((isBaseTestReducer(action) ? baseTestReducer(state, action) : state), action);

    if (!isMainTestReducer(action)) {
        return state;
    }

    return (isBaseTestReducer(action) ? baseTestReducer(extendedTestReducer(state, action), action) : extendedTestReducer(state, action));
};

export default mainTestReducer;
`);
            });
        });
        describe("... and compilation will be for root files", () => {
            it("... and indexMain template is passed and has state as default export, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                testModel.state.hasStateAsDefaultExport = true;
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.rootTemplates.indexMain,
                        testModel
                    ));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { MAIN_REDUCERACTIONS as RAs } from "./reducerActions/reducerActions.main.generated";
import TESTSTATE from "./state";

export { mainTestReducer } from "./reducer/reducer.main.generated";
export { MAIN_ACTIONS } from "./actions/actions.main.generated";
export { EXT_ACTIONS } from "./actions/actions.extended";
export { BASE_ACTIONS } from "./actions/actions.base.generated";
export { CREATOR_MAIN } from "./actionCreators/actionCreators.main.generated";
export * from "./ReducerContext.main.generated";

export { isMainTestReducer } from "./reducerActions/reducerActions.main.generated";
export { isExtendedTestReducer } from "./reducerActions/reducerActions.extended";
export { isBaseTestReducer } from "./reducerActions/reducerActions.base.generated";

export { getTestStateDefault } from "./defaultState.base.generated";

export type MAIN_REDUCERACTIONS = RAs;
export type TestFeatureState = TESTSTATE;
`);
            });
            it("... and indexMain template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.rootTemplates.indexMain,
                        testModel
                    ));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { MAIN_REDUCERACTIONS as RAs } from "./reducerActions/reducerActions.main.generated";
import { TESTSTATE } from "./state";

export { mainTestReducer } from "./reducer/reducer.main.generated";
export { MAIN_ACTIONS } from "./actions/actions.main.generated";
export { EXT_ACTIONS } from "./actions/actions.extended";
export { BASE_ACTIONS } from "./actions/actions.base.generated";
export { CREATOR_MAIN } from "./actionCreators/actionCreators.main.generated";
export * from "./ReducerContext.main.generated";

export { isMainTestReducer } from "./reducerActions/reducerActions.main.generated";
export { isExtendedTestReducer } from "./reducerActions/reducerActions.extended";
export { isBaseTestReducer } from "./reducerActions/reducerActions.base.generated";

export { getTestStateDefault } from "./defaultState.base.generated";

export type MAIN_REDUCERACTIONS = RAs;
export type TestFeatureState = TESTSTATE;
`);
            });
            it("... and default state template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(
                        clazz.rootTemplates.defaultState,
                        testModel
                    ));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import { TESTSTATE } from "./state";

export const getTestStateDefault = (): TESTSTATE => ({
    prop1: "",
    prop2: undefined,
});

export default getTestStateDefault;
`);
            });
            it("... and index template is passed, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result =
                    clazz.actionCreatorsTemplates &&
                    (await clazz.compile(clazz.rootTemplates.index, testModel));

                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`export * from "./index.main.generated";
`);
            });
        });
        describe("... and compilation will be for context files", () => {
            it("... and boilerplate template is passed and has state as default export, Then result will match expected string", async () => {
                // arrange:
                const testModel = getTestModel();
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result = await clazz.compile(
                    clazz.contextTemplates.context,
                    testModel
                );

                // console.log(result);
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { TESTSTATE } from "./state";
import { mainTestReducer } from "./reducer/reducer.main.generated";
import { getTestStateDefault } from "./defaultState.base.generated";
import { MAIN_REDUCERACTIONS } from "./reducerActions/reducerActions.main.generated";

export type OnTestFeatureReducerContextDispatchWillBeCalled = (action: MAIN_REDUCERACTIONS) => void;

export interface ITestFeatureReducerContext {
    state: TESTSTATE;
    dispatch: React.Dispatch<MAIN_REDUCERACTIONS>;
    listenOnDispatchWillBeCalled: (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => void;
    removeOnDispatchWillBeCalled: (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => void;
}

export type IDispatchTestFeatureReducerContext = React.Dispatch<MAIN_REDUCERACTIONS>;

export type IStateTestFeatureReducerContext = TESTSTATE;

export const TestFeatureReducerContext = React.createContext<ITestFeatureReducerContext>({
    state: getTestStateDefault(),
    dispatch: () => undefined,
    listenOnDispatchWillBeCalled: () => undefined,
    removeOnDispatchWillBeCalled: () => undefined,
});

export const DispatchTestFeatureReducerContext = React.createContext<IDispatchTestFeatureReducerContext>(() => undefined);

export const StateTestFeatureReducerContext = React.createContext<IStateTestFeatureReducerContext>(getTestStateDefault());

export const TestFeatureReducerContextProvider = (props: {
    children: React.ReactNode;
    getDefaultState?: typeof getTestStateDefault;
}) => {
    const { children, getDefaultState } = props;

    const [state, dispatch] = React.useReducer(
        mainTestReducer,
        undefined,
        getDefaultState ?? getTestStateDefault
    );

    const dispatchWillBeCalledCallbacks = useRef<
        OnTestFeatureReducerContextDispatchWillBeCalled[]
    >([]);

    const listenOnDispatchWillBeCalled = useCallback(
        (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => {
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
        (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => {
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

    const context: ITestFeatureReducerContext = React.useMemo(
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
        <DispatchTestFeatureReducerContext.Provider value={dispatchCallback}>
            <StateTestFeatureReducerContext.Provider value={state}>
                <TestFeatureReducerContext.Provider value={context}>
                    {children}
                </TestFeatureReducerContext.Provider>
            </StateTestFeatureReducerContext.Provider>
        </DispatchTestFeatureReducerContext.Provider>
    );
};
export const useTestFeatureReducerContext: () => ITestFeatureReducerContext = () => {
    return React.useContext<ITestFeatureReducerContext>(TestFeatureReducerContext);
};

export const useTestFeatureReducerContextState: () => IStateTestFeatureReducerContext = () => {
    return React.useContext<IStateTestFeatureReducerContext>(StateTestFeatureReducerContext);
};

export const useTestFeatureReducerContextDispatch: () => IDispatchTestFeatureReducerContext = () => {
    return React.useContext<IDispatchTestFeatureReducerContext>(DispatchTestFeatureReducerContext);
};
/**
 * Use this method if you want to react on dispatch calls (e.g. call additional methods or talk to a... frame?)
 * @param callback callback which will be called dispatch gets called
 */
export const useTestFeatureDispatchWillBeCalledEffect = (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => {
    const {
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    } = useTestFeatureReducerContext();

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
 * @param onStateChanged callback which will be called if TestFeatureState changes
 */
export const useTestFeatureStateChangedEffect = (
    onStateChanged: (next: TESTSTATE, old: TESTSTATE | null) => Promise<void> | void
) => {
    const state = useTestFeatureReducerContextState();

    const callbackRef = useRef<typeof onStateChanged>(onStateChanged);
    const [, setOld] = useState<TESTSTATE | null>(null);

    useEffect(() => {
        callbackRef.current = onStateChanged;
    }, [onStateChanged]);

    useLayoutEffect(() => {
        setOld((prev) => {
            const { current } = callbackRef;
            if (current && state !== prev) {
                current(state, prev);
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
export const useTestFeatureStatePropertyChangedEffect = <
    TKey extends keyof TESTSTATE
>(
    property: TKey,
    onStatePropertyChanged: (
        next: TESTSTATE[TKey],
        old: TESTSTATE[TKey] | null,
        state: TESTSTATE,
        oldState: TESTSTATE | null
    ) => Promise<void> | void
) => {
    const callbackRef = useRef<typeof onStatePropertyChanged>(
        onStatePropertyChanged
    );

    useEffect(() => {
        callbackRef.current = onStatePropertyChanged;
    }, [onStatePropertyChanged]);

    const changedCallback = useCallback(
        async (next: TESTSTATE, old: TESTSTATE | null) => {
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

    useTestFeatureStateChangedEffect(changedCallback);
};
`);
            });

            it("... and boilerplate template is passed and has state as default export and creating useDirectProperty, Then result will match expected string", async () => {
                // arrange:
                const testModel = {
                    ...getTestModel(),
                };

                testModel.options.createContextDirectPropertyHooks = true;
                const clazz = new TemplatingEngine();

                // act
                await clazz.initialize();
                const result = await clazz.compile(
                    clazz.contextTemplates.context,
                    testModel
                );

                // console.log(result);
                // assert
                expect(result.replace(/\r\n/g, "\n"))
                    .toBe(`import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { TESTSTATE } from "./state";
import { mainTestReducer } from "./reducer/reducer.main.generated";
import { getTestStateDefault } from "./defaultState.base.generated";
import { MAIN_REDUCERACTIONS } from "./reducerActions/reducerActions.main.generated";
import { CREATOR_MAIN } from "./actionCreators/actionCreators.main.generated";

export type OnTestFeatureReducerContextDispatchWillBeCalled = (action: MAIN_REDUCERACTIONS) => void;

export interface ITestFeatureReducerContext {
    state: TESTSTATE;
    dispatch: React.Dispatch<MAIN_REDUCERACTIONS>;
    listenOnDispatchWillBeCalled: (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => void;
    removeOnDispatchWillBeCalled: (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => void;
}

export type IDispatchTestFeatureReducerContext = React.Dispatch<MAIN_REDUCERACTIONS>;

export type IStateTestFeatureReducerContext = TESTSTATE;

export const TestFeatureReducerContext = React.createContext<ITestFeatureReducerContext>({
    state: getTestStateDefault(),
    dispatch: () => undefined,
    listenOnDispatchWillBeCalled: () => undefined,
    removeOnDispatchWillBeCalled: () => undefined,
});

export const DispatchTestFeatureReducerContext = React.createContext<IDispatchTestFeatureReducerContext>(() => undefined);

export const StateTestFeatureReducerContext = React.createContext<IStateTestFeatureReducerContext>(getTestStateDefault());

export const TestFeatureReducerContextProvider = (props: {
    children: React.ReactNode;
    getDefaultState?: typeof getTestStateDefault;
}) => {
    const { children, getDefaultState } = props;

    const [state, dispatch] = React.useReducer(
        mainTestReducer,
        undefined,
        getDefaultState ?? getTestStateDefault
    );

    const dispatchWillBeCalledCallbacks = useRef<
        OnTestFeatureReducerContextDispatchWillBeCalled[]
    >([]);

    const listenOnDispatchWillBeCalled = useCallback(
        (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => {
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
        (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => {
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

    const context: ITestFeatureReducerContext = React.useMemo(
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
        <DispatchTestFeatureReducerContext.Provider value={dispatchCallback}>
            <StateTestFeatureReducerContext.Provider value={state}>
                <TestFeatureReducerContext.Provider value={context}>
                    {children}
                </TestFeatureReducerContext.Provider>
            </StateTestFeatureReducerContext.Provider>
        </DispatchTestFeatureReducerContext.Provider>
    );
};
export const useTestFeatureReducerContext: () => ITestFeatureReducerContext = () => {
    return React.useContext<ITestFeatureReducerContext>(TestFeatureReducerContext);
};

export const useTestFeatureReducerContextState: () => IStateTestFeatureReducerContext = () => {
    return React.useContext<IStateTestFeatureReducerContext>(StateTestFeatureReducerContext);
};

export const useTestFeatureReducerContextDispatch: () => IDispatchTestFeatureReducerContext = () => {
    return React.useContext<IDispatchTestFeatureReducerContext>(DispatchTestFeatureReducerContext);
};
/**
 * Use this method if you want to react on dispatch calls (e.g. call additional methods or talk to a... frame?)
 * @param callback callback which will be called dispatch gets called
 */
export const useTestFeatureDispatchWillBeCalledEffect = (callback: OnTestFeatureReducerContextDispatchWillBeCalled) => {
    const {
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    } = useTestFeatureReducerContext();

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
 * @param onStateChanged callback which will be called if TestFeatureState changes
 */
export const useTestFeatureStateChangedEffect = (
    onStateChanged: (next: TESTSTATE, old: TESTSTATE | null) => Promise<void> | void
) => {
    const state = useTestFeatureReducerContextState();

    const callbackRef = useRef<typeof onStateChanged>(onStateChanged);
    const [, setOld] = useState<TESTSTATE | null>(null);

    useEffect(() => {
        callbackRef.current = onStateChanged;
    }, [onStateChanged]);

    useLayoutEffect(() => {
        setOld((prev) => {
            const { current } = callbackRef;
            if (current && state !== prev) {
                current(state, prev);
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
export const useTestFeatureStatePropertyChangedEffect = <
    TKey extends keyof TESTSTATE
>(
    property: TKey,
    onStatePropertyChanged: (
        next: TESTSTATE[TKey],
        old: TESTSTATE[TKey] | null,
        state: TESTSTATE,
        oldState: TESTSTATE | null
    ) => Promise<void> | void
) => {
    const callbackRef = useRef<typeof onStatePropertyChanged>(
        onStatePropertyChanged
    );

    useEffect(() => {
        callbackRef.current = onStatePropertyChanged;
    }, [onStatePropertyChanged]);

    const changedCallback = useCallback(
        async (next: TESTSTATE, old: TESTSTATE | null) => {
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

    useTestFeatureStateChangedEffect(changedCallback);
};

/**
 * Use this method if you want to get a single property from state and a callback function for updating it of TestFeature
 * @param propertyName property of state
 */
export function useDirectTestFeatureProperty<T extends keyof TESTSTATE>(propertyName: T) {
    const dispatch = useTestFeatureReducerContextDispatch();
    const value = useDirectTestFeaturePropertyValue(propertyName);

    const setProperty = useMemo(() => {
        switch (propertyName) {
            case "prop1":
                return (next: TESTSTATE["prop1"]) =>
                    dispatch(
                        CREATOR_MAIN.setProp1(
                            next
                        )
                    );
            case "prop2":
                return (next: TESTSTATE["prop2"]) =>
                    dispatch(
                        CREATOR_MAIN.setProp2(
                            next
                        )
                    );
            default:
                throw new Error(
                    \`Unknown property. No property with name "$\{propertyName\}" has been registered for state of feature "TestFeature".\`
                );
        }
    }, [dispatch, propertyName]);

    return useMemo(() => [value, setProperty], [value, setProperty]);
};

/**
 * Use this method if you want to get only a single property from state of TestFeature
 * @param propertyName property of state
 */
export function useDirectTestFeaturePropertyValue<T extends keyof TESTSTATE>(propertyName: T) {
    const { state, dispatch } = useTestFeatureReducerContextState();
    return state[propertyName];
};
`);
            });
        });
    });
});
