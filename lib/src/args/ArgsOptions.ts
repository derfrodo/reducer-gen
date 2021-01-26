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
    filesSuffix: { demandOption: false, default: ".base.generated" },
    filesPrefix: { demandOption: false, default: "" },
    mainFilesSuffix: { demandOption: false, default: ".main.generated" },
    mainFilesPrefix: { demandOption: false, default: "" },
    createReducerContext: { boolean: true, default: false },
    addBubbleFlagForActions: { boolean: true, default: true },
};

export default ArgsOptions;
