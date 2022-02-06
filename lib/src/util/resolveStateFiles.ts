import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import log from "loglevel";
import { CliArgs } from "../interfaces/CliArgs";

export async function resolveStateFiles(
    argv: CliArgs,
    fsHelper: FileSystemHelper = new FileSystemHelper()
): Promise<string[]> {
    const stateFilePaths = (
        await Promise.all(
            argv.stateFilesPattern.map((p) =>
                fsHelper.findFiles(argv.srcFolder, p, {
                    includeNested: true,
                })
            )
        )
    ).flat();
    log.debug("State files resolved: ", JSON.stringify(stateFilePaths));
    return stateFilePaths;
}
