import type { CliArgs } from "./CliArgs";

export type ArgsV = CliArgs & {
    _: string[];
    [key: string]: string | string[];
};
