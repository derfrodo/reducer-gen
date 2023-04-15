import { LogLevelDesc } from "loglevel";

export interface CliArgs {
    loglevel: LogLevelDesc;
    srcFolder: string;
    stateFilesPattern: string[];

    filesPrefix: string;
    filesSuffix: string;
    mainFilesSuffix: string;
    mainFilesPrefix: string;

    createReducerContext: boolean;
    createContextDirectPropertyHooks: boolean;
    addGetCurrentStateToContext: boolean;
    
    addBubbleFlagForActions: boolean;
    addArrayFunctions: boolean;

    generateSyncStateActions: boolean;
    generateWebAppHybridHooks: boolean;
    generateReactNativeHybridHooks: boolean;
    decoupleStateChangedCallbackByTimeout: boolean;

    analyseLiteralTypes: boolean;
}
