import { LogLevelDesc } from "loglevel";

export interface CliArgs {
    loglevel: LogLevelDesc;
    srcFolder: string;
    filesPrefix: string;
    filesSuffix: string;
    mainFilesSuffix: string;
    mainFilesPrefix: string;

    createReducerContext: boolean;
    addBubbleFlagForActions: boolean;
    addArrayFunctions: boolean;

    generateSyncStateActions: boolean;
    generateWebAppHybridHooks: boolean;
    generateReactNativeHybridHooks: boolean;
    decoupleStateChangedCallbackByTimeout: boolean;

    typeLiteralsAsObject: boolean;
    typeAliasesAsObject: boolean;
}
