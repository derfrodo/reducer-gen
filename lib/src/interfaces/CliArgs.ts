import { LogLevelDesc } from "loglevel";

export interface CliArgs {
    loglevel: LogLevelDesc;
    filesPrefix: string;
    filesSuffix: string;
    mainFilesSuffix: string;
    mainFilesPrefix: string;
    createReducerContext: boolean;
    addBubbleFlagForActions: boolean;

    generateSyncStateActions: boolean;
    generateWebAppHybridHooks: boolean;
    generateReactNativeHybridHooks: boolean;

}

export default CliArgs;
