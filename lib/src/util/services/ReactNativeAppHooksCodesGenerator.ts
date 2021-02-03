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
        return `${this.reduxModuleNamingHelper.getGeneralGenertedFileInformation()}
import { MutableRefObject, useCallback } from "react";
import {
    asSyncStateAction,
    createSyncStateAction,
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

export const useSendReactNativeMessageToWebApp = <T extends ContextAction>(
    webViewRef: MutableRefObject<
        { injectJavaScript: (js: string) => void } | undefined
    > | null,
    targetOrigin = "*"
) => {
    const postMessageJavascriptCode = useCallback(
        (action: T) => {
            const syncStateAction = createSyncStateAction(
                action,
                SYNC_STATE_ACTION_SOURCE_FRAME
            );

            return \`window.postMessage(\${JSON.stringify(
                JSON.stringify(syncStateAction)
            )}, \${targetOrigin})\`;
        },
        [targetOrigin]
    );

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
    dispatch: React.Dispatch<T>,
    actionTypeguard: (data: any) => data is T
) => {
    const callback = useCallback(
        (event: { nativeEvent: { data: string } }) => {
            try {
                const action = asSyncStateAction(
                    event?.nativeEvent?.data,
                    actionTypeguard
                );
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
            }
        },
        [actionTypeguard, dispatch]
    );
    return callback;
};
`;
    }
}
