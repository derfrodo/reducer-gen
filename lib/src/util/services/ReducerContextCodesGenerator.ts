import {
    doBindPrototype,
    StringHelper,
} from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";

export class ReducerContextCodesGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService,
        private stringHelper: StringHelper = new StringHelper()
    ) {
        doBindPrototype(this, ReducerContextCodesGenerator.prototype);
    }

    getStateInterfaceName(stateInfo: StateInterfaceInfo): string {
        return this.reduxModuleNamingHelper.getStateInterfaceName(stateInfo);
    }

    generateReducerContextContent(stateInfo: StateInterfaceInfo): string {
        const reducerName = this.getReducerMethodName(stateInfo, "main");
        const defaultStateMethodName = this.getGetDefaultStateMethodName(
            stateInfo,
            "main"
        );

        const { defaultState } = this.fileService.getGeneratedModulNames();
        const {
            reducer: reducerModuleName,
            reducerActions: reducerActionsModuleName,
        } = this.fileService.getMainModulNames();
        const reducerActionsName = this.getReducerActionName(stateInfo, "main");
        const stateName = this.getStateInterfaceName(stateInfo);
        const stateImport = this.reduxModuleNamingHelper.getStateInterfaceImportLine(
            stateInfo
        );
        const reducerContextName = `${this.stringHelper.toPascalCased(
            reducerName
        )}Context`;

        return `import React, { useCallback, useEffect, useRef, useState } from "react";
${stateImport}
import ${reducerName} from "./reducer/${reducerModuleName}";
import ${reducerActionsName} from "./reducerActions/${reducerActionsModuleName}";
import ${defaultStateMethodName} from "./${defaultState}";

export type On${reducerContextName}DispatchWillBeCalled = (action: ${reducerActionsName}) => void;

export interface I${reducerContextName} {
    state: ${stateName};
    dispatch: React.Dispatch<${reducerActionsName}>;
    listenOnDispatchWillBeCalled: (callback: On${reducerContextName}DispatchWillBeCalled) => void;
    removeOnDispatchWillBeCalled: (callback: On${reducerContextName}DispatchWillBeCalled) => void;
}

export type IDispatch${reducerContextName} = React.Dispatch<${reducerActionsName}>;

export type IState${reducerContextName} = ${stateName};

export const ${reducerContextName} = React.createContext<I${reducerContextName}>({
    state: ${defaultStateMethodName}(),
    dispatch: () => undefined,
    listenOnDispatchWillBeCalled: () => undefined,
    removeOnDispatchWillBeCalled: () => undefined,
});

export const Dispatch${reducerContextName} = React.createContext<IDispatch${reducerContextName}>(() => undefined);

export const State${reducerContextName} = React.createContext<IState${reducerContextName}>(${defaultStateMethodName}());

${this.generateReducerContextProviderContent(stateInfo)}
${this.generateReducerContextHooksContent(
    stateInfo
)}${this.generateUseStateChangedEffectHooks(stateInfo)}`;
    }

    /**
     * extending the method @see {generateReducerContextContent} content, do not use directly aside from testing
     */
    generateReducerContextProviderContent(
        stateInfo: StateInterfaceInfo
    ): string {
        const reducerName = this.getReducerMethodName(stateInfo, "main");
        const defaultStateMethodName = this.getGetDefaultStateMethodName(
            stateInfo,
            "main"
        );

        const reducerActionsName = this.getReducerActionName(stateInfo, "main");
        const stateName = this.getStateInterfaceName(stateInfo);
        const reducerContextName = `${this.stringHelper.toPascalCased(
            reducerName
        )}Context`;

        return `export const ${reducerContextName}Provider = (props: {
    children: React.ReactNode;
}) => {
    const { children } = props;

    const [state, dispatch] = React.useReducer(
        ${reducerName},
        undefined,
        ${defaultStateMethodName}
    );


    const dispatchWillBeCalledCallbacks = useRef<
        On${reducerContextName}DispatchWillBeCalled[]
    >([]);

    const listenOnDispatchWillBeCalled = useCallback(
        (callback: On${reducerContextName}DispatchWillBeCalled) => {
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
        (callback: On${reducerContextName}DispatchWillBeCalled) => {
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

    const context: I${reducerContextName} = React.useMemo(
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
        <Dispatch${reducerContextName}.Provider value={dispatch}>
            <State${reducerContextName}.Provider value={state}>
                <${reducerContextName}.Provider value={context}>
                    {children}
                </${reducerContextName}.Provider>
            </State${reducerContextName}.Provider>
        </Dispatch${reducerContextName}.Provider>
    );
};
`;
    }

    /**
     * extending the method @see {generateReducerContextContent} content, do not use directly aside from testing
     */
    generateReducerContextHooksContent(stateInfo: StateInterfaceInfo): string {
        const reducerName = this.getReducerMethodName(stateInfo, "main");
        const reducerContextName = `${this.stringHelper.toPascalCased(
            reducerName
        )}Context`;

        return `export const use${reducerContextName}: () => I${reducerContextName} = () => {
    return React.useContext<I${reducerContextName}>(${reducerContextName});
};

export const use${reducerContextName}State: () => IState${reducerContextName} = () => {
    return React.useContext<IState${reducerContextName}>(State${reducerContextName});
};

export const use${reducerContextName}Dispatch: () => IDispatch${reducerContextName} = () => {
    return React.useContext<IDispatch${reducerContextName}>(Dispatch${reducerContextName});
};
`;
    }

    public generateUseStateChangedEffectHooks(
        stateInfo: StateInterfaceInfo
    ): string {
        const reducerName = this.getReducerMethodName(stateInfo, "main");
        const feature = this.reduxModuleNamingHelper.getPascalCasedFeatureName(
            stateInfo
        );
        const reducerContextName = `${this.stringHelper.toPascalCased(
            reducerName
        )}Context`;

        return `
/**
 * Use this method if you want to react on dispatch calls (e.g. call additional methods or talk to a... frame?)
 * @param callback callback which will be called dispatch gets called
 */
export const use${feature}DispatchWillBeCalledEffect = (callback: On${reducerContextName}DispatchWillBeCalled) => {
    const {
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    } = use${reducerContextName}();

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
 * @param onStateChanged callback which will be called if ${feature}State changes
 */
export const use${feature}StateChangedEffect = <T extends IState>(
    onStateChanged: (next: IState, old: IState | null) => Promise<void> | void
) => {
    const state = use${reducerContextName}State();

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
export const use${feature}StatePropertyChangedEffect = <
    T extends IState,
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

    use${feature}StateChangedEffect(changedCallback);
};
`;
    }

    // Cool methods
    private getGetDefaultStateMethodName(
        stateInfo: StateInterfaceInfo,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getGetDefaultStateMethodName(
            stateInfo,
            modul
        );
    }

    private getReducerMethodName(
        stateInfo: StateInterfaceInfo,
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            modul
        );
    }

    private getReducerActionName(
        stateInfo: StateInterfaceInfo,
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getReducerActionName(
            stateInfo,
            modul
        );
    }
}
