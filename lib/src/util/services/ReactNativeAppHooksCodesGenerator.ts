import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";

export interface ReactNativeAppHooksCodesGeneratorOptions {}

export class ReactNativeAppHooksCodesGenerator {
    constructor(
        private options: ReactNativeAppHooksCodesGeneratorOptions,
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService
    ) {
        doBindPrototype(this, ReactNativeAppHooksCodesGenerator.prototype);
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
    generateHybridReactNativeHooksContent(): string {
        return `// DEPRECATED -> Better use @derfrodo/call-of-action package for this :)
${this.reduxModuleNamingHelper.getGeneralGenertedFileInformation()}
import { MutableRefObject, useCallback, useEffect } from "react";
import {
    asSyncStateAction,
    createSyncStateAction,
    SyncStateAction,
    SYNC_STATE_ACTION_SOURCE_FRAME,
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

type WebViewRef = MutableRefObject<
    | {
          injectJavaScript: (js: string) => void;
      }
    | undefined
> | null;

/**
 * Use this method to enable post message on non bubbled actions for react native
 * @param callback callback which will be called dispatch gets called
 */
export const usePostMessageToWebViewOnDispatch = <T extends ContextAction>(
    webViewRef: WebViewRef,
    context: IPostMessageToReactNativeContext<T>
) => {
    const sendMessage = useSendReactNativeMessageToWebApp<T>(webViewRef);
    const onDispatch = useCallback<OnContextDispatchWillBeCalled<T>>(
        (action) => {
            if (!action.isBubbled) {
                sendMessage({ ...action, isBubbled: true });
            }
        },
        [sendMessage]
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

export const useSendReactNativeMessageToWebApp = <T extends ContextAction>(
    webViewRef: WebViewRef
) => {
    const postMessageJavascriptCode = useCallback((action: T) => {
        const syncStateAction = createSyncStateAction(
            action,
            SYNC_STATE_ACTION_SOURCE_FRAME
        );

        return \`window.postMessage(\${JSON.stringify(
            JSON.stringify(syncStateAction)
        )}, window.location.origin)\`;
    }, []);

    return useCallback(
        (action: T) => {
            const { current } = webViewRef || {};
            if (!current) {
                console.warn(
                    "Can not inject javascript into webview. No webview has been resolved."
                );
            } else {
                const js = postMessageJavascriptCode(action);
                current.injectJavaScript(js);
            }
        },
        [postMessageJavascriptCode, webViewRef]
    );
};

export const useReactNativeWebViewOnMessage = <T extends ContextAction>(
    onMessage: (action: SyncStateAction<T>) => Promise<void> | void,
    isActionTypeguard: (data: any) => data is T,
    options?: { onError?: (error: any) => Promise<void> | void }
) => {
    const { onError } = options || {};
    const callback = useCallback(
        (event: { nativeEvent: { data: string } }) => {
            try {
                const action = asSyncStateAction(
                    event?.nativeEvent?.data,
                    isActionTypeguard
                );
                if (action !== null) {
                    onMessage(action);
                }
            } catch (err) {
                console.error("Failed to react on sync state action event", {
                    error: err,
                });
                if (onError) {
                    onError(err);
                }
            }
        },
        [isActionTypeguard, onError, onMessage]
    );
    return callback;
};

export const useDispatchOnReactNativeWebViewOnMessage = <
    T extends ContextAction
>(
    dispatch: React.Dispatch<T>,
    isActionTypeguard: (data: any) => data is T,
    options?: { onError?: (error: any) => Promise<void> | void }
) => {
    const { onError } = options || {};
    const callback = useCallback(
        (action: SyncStateAction<T>) => {
            try {
                if (
                    action !== null &&
                    action.source === SYNC_STATE_ACTION_SOURCE_WEBAPP
                ) {
                    dispatch(action.payload);
                }
            } catch (err) {
                console.error("Failed to react on sync state action event", {
                    error: err,
                });
                if (onError) {
                    onError(err);
                }
            }
        },
        [dispatch, onError]
    );

    return useReactNativeWebViewOnMessage(callback, isActionTypeguard, options);
};
`;
    }
}
