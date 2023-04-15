import { LogLevelDesc } from "loglevel";
import type { Options } from "yargs";
import type { CliArgs } from "../interfaces/CliArgs";

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
    stateFilesPattern: {
        demandOption: false,
        default: ["/redux/state.ts", "/reducer/state.ts"],
    },

    filesSuffix: { demandOption: false, default: ".base.generated" },
    filesPrefix: { demandOption: false, default: "" },
    mainFilesSuffix: { demandOption: false, default: ".main.generated" },
    mainFilesPrefix: { demandOption: false, default: "" },

    createContextDirectPropertyHooks: { boolean: true, default: false },
    createReducerContext: { boolean: true, default: false },
    addGetCurrentStateToContext: { boolean: true, default: false },
    
    addBubbleFlagForActions: { boolean: true, default: true },
    addArrayFunctions: { boolean: true, default: true },

    generateSyncStateActions: { boolean: true, default: false },
    generateWebAppHybridHooks: { boolean: true, default: false },
    generateReactNativeHybridHooks: { boolean: true, default: false },
    decoupleStateChangedCallbackByTimeout: { boolean: true, default: false },
    analyseLiteralTypes: {
        boolean: true,
        default: false,
        alias: ["literalTypesAsObject"],
    },
};
