import { LogLevelDesc } from "loglevel";

export interface CliArgs {
    loglevel: LogLevelDesc;
    filesPrefix: string;
    filesSuffix: string;
    mainFilesSuffix: string;
    mainFilesPrefix: string;
    createReducerContext: boolean;
}

export default CliArgs;
