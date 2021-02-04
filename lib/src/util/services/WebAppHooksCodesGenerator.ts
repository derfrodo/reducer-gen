import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";

export interface WebAppHooksCodesGeneratorOptions {}

export class WebAppHooksCodesGeneratorGenerator {
    constructor(
        private options: WebAppHooksCodesGeneratorOptions,
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService
    ) {
        doBindPrototype(this, WebAppHooksCodesGeneratorGenerator.prototype);
    }

    getImportClauses(
        stateInfo: StateInterfaceInfo,
        asNested = true,
        asComment = false
    ): string {
        const { importClauses } = stateInfo;
        return asNested
            ? `${importClauses
                  .map((clause) =>
                      asComment
                          ? this.fileService.addCommentToImportClause(clause)
                          : clause
                  )
                  .map(this.fileService.addLevelToImportClause)
                  .join("\n")}`
            : `${importClauses.join("\n")}`;
    }

    // Main Elements
    generateHybridWebAppHooksContent(): string {
        return `${this.reduxModuleNamingHelper.getGeneralGenertedFileInformation()}
import { useCallback, useEffect } from "react";
import {
    asSyncStateAction,
    createSyncStateAction,
    SYNC_STATE_ACTION_SOURCE_WEBAPP,
} from "./index.generated";

export type ContextAction = { isBubbled?: boolean };
export type OnContextDispatchWillBeCalled<T extends ContextAction> = (
    action: T
) => void;

export interface IPostMessageToReactNativeContext<T extends ContextAction> {
    dispatch: React.Dispatch<T>;
    listenOnDispatchWillBeCalled: (
        callback: OnContextDispatchWillBeCalled<T>
    ) => void;
    removeOnDispatchWillBeCalled: (
        callback: OnContextDispatchWillBeCalled<T>
    ) => void;
}

export type ReactNativeWebviewWindow = {
    ReactNativeWebView?: { postMessage?: (message: string) => any };
};

/**
 * Use this method to enable post message on non bubbled actions for react native
 * @param callback callback which will be called dispatch gets called
 */
export const usePostMessageToReactNativeOnDispatch = <T extends ContextAction>(
    context: IPostMessageToReactNativeContext<T>
) => {
    const onDispatch = useCallback<OnContextDispatchWillBeCalled<T>>(
        (action) => {
            const origin = document.location.origin || window.location.origin;
            if (!action.isBubbled) {
                const syncStateAction = createSyncStateAction(
                    { ...action, isBubbled: true },
                    SYNC_STATE_ACTION_SOURCE_WEBAPP
                );
                window.postMessage(syncStateAction, origin);
                const rnWindow = window as ReactNativeWebviewWindow;
                if (
                    rnWindow.ReactNativeWebView &&
                    rnWindow.ReactNativeWebView.postMessage
                ) {
                    rnWindow.ReactNativeWebView.postMessage(
                        JSON.stringify(syncStateAction)
                    );
                }
            }
        },
        []
    );
    const {
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    } = context;
    useEffect(() => {
        if (onDispatch) {
            listenOnDispatchWillBeCalled(onDispatch);
            return () => {
                removeOnDispatchWillBeCalled(onDispatch);
            };
        }
    }, [
        onDispatch,
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    ]);
};

/**
 * Use this method to consume post messages from react native
 * @param callback callback which will be called dispatch gets called
 */
export const useConsumePostMessages = <T extends ContextAction>(
    dispatch: React.Dispatch<T>,
    isActionTypeguard: (data: any) => data is T
) => {
    const postMessageCallback = useCallback(
        (event: MessageEvent) => {
            try {
                const { data, origin, source } = event;
                if(origin !== window.location.origin){
                    console.debug(
                        "Processing posted event: Origin differs",
                        {
                            eventOrigin: origin,
                        }
                    );
                    return;
                }
                if(source !== window){
                    console.debug(
                        "Processing posted event: Source differs",
                        {
                            eventOrigin: origin,
                        }
                    );
                    return;
                }

                const action = asSyncStateAction(data, isActionTypeguard);
                if (action) {
                    dispatch(action.payload);
                }
            } catch (err) {
                console.error("Processing post event failed", { error: err });
            }
        },
        [dispatch, isActionTypeguard]
    );

    const registerCallback = useCallback(() => {
        try {
            window.addEventListener("message", postMessageCallback, undefined);
        } catch (err) {
            console.warn("Failed to register message events on window", {
                error: err,
            });
        }
        try {
            // for iOS
            (document as any).addEventListener("message", postMessageCallback);
        } catch (err) {
            console.warn(
                "Failed to register message events on document (iOS)",
                {
                    error: err,
                }
            );
        }

        return () => {
            try {
                window.removeEventListener(
                    "message",
                    postMessageCallback,
                    undefined
                );
            } catch (err) {
                console.warn("Failed to unregister message events on window", {
                    error: err,
                });
            }
            try {
                // for iOS
                (document as any).removeEventListener(
                    "message",
                    postMessageCallback
                );
            } catch (err) {
                console.warn(
                    "Failed to unregister message events on document (iOS)",
                    {
                        error: err,
                    }
                );
            }
        };
    }, [postMessageCallback]);

    useEffect(() => {
        console.debug("Register message event callback");
        return registerCallback();
    }, [registerCallback]);
};

export type WpfWebviewWindow = {
    InvokeFromExternal?: (message: string) => any;
    external?: { notify?: (message: string) => any };
};

/**
 * Use this method to invoke wpf webview with sync state actions
 * @param callback callback which will be called dispatch gets called
 */
export const useInvokeWpfWebViewOnDispatch = <T extends ContextAction>(
    context: IPostMessageToReactNativeContext<T>
) => {
    const onDispatch = useCallback<OnContextDispatchWillBeCalled<T>>(
        (action) => {
            if (!action.isBubbled) {
                const syncStateAction = createSyncStateAction(
                    action,
                    SYNC_STATE_ACTION_SOURCE_WEBAPP
                );
                const wpfWindow = window as WpfWebviewWindow;
                if (wpfWindow.external && wpfWindow.external.notify) {
                    wpfWindow.external.notify(JSON.stringify(syncStateAction));
                }
            }
        },
        []
    );

    const {
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    } = context;

    useEffect(() => {
        if (onDispatch) {
            listenOnDispatchWillBeCalled(onDispatch);
            return () => {
                removeOnDispatchWillBeCalled(onDispatch);
            };
        }
    }, [
        onDispatch,
        listenOnDispatchWillBeCalled,
        removeOnDispatchWillBeCalled,
    ]);
};
`;
    }
}
