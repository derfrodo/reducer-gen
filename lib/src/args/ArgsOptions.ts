import { LogLevelDesc } from "loglevel";
import { Options } from "yargs";
import CliArgs from "../interfaces/CliArgs";

const logLevelChoices: ReadonlyArray<LogLevelDesc> = [
    0,
    "TRACE",
    "DEBUG",
    "INFO",
    "WARN",
    "ERROR",
    "SILENT",
    1,
    2,
    3,
    4,
    5,
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "silent",
];

export const ArgsOptions: { [key in keyof CliArgs]: Options } = {
    loglevel: {
        choices: logLevelChoices,
        default: "info",
    },
    srcFolder: { demandOption: false, default: "./src" },

    filesSuffix: { demandOption: false, default: ".base.generated" },
    filesPrefix: { demandOption: false, default: "" },
    mainFilesSuffix: { demandOption: false, default: ".main.generated" },
    mainFilesPrefix: { demandOption: false, default: "" },

    createReducerContext: { boolean: true, default: false },
    addBubbleFlagForActions: { boolean: true, default: true },
    addArrayFunctions: { boolean: true, default: true },

    generateSyncStateActions: { boolean: true, default: false },
    generateWebAppHybridHooks: { boolean: true, default: false },
    generateReactNativeHybridHooks: { boolean: true, default: false },
    decoupleStateChangedCallbackByTimeout: { boolean: true, default: false },
};

export default ArgsOptions;
