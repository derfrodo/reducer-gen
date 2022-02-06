import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { CliArgs } from "../interfaces/CliArgs";
import { resolveStateFiles } from "./resolveStateFiles";

describe("resolveStateFiles tests", () => {
    it("Integration: resolveStateFiles uses filesystem helper", async () => {
        const cliArgs: CliArgs = {
            stateFilesPattern: ["state.ts"],
            srcFolder: "./testData",
        } as CliArgs;

        const result = await resolveStateFiles(cliArgs);

        expect(result).toEqual(["./testData/simpleState/reducer/state.ts"]);
    });

    it("resolveStateFiles uses filesystem helper", async () => {
        const cliArgs: CliArgs = {
            stateFilesPattern: ["state.ts"],
            srcFolder: "./testData",
        } as CliArgs;

        const helper = {
            findFiles: jest.fn().mockImplementation((a) => `Searched in ${a}`),
        } as unknown as FileSystemHelper;

        const result = await resolveStateFiles(cliArgs, helper);

        expect(result).toEqual([`Searched in ./testData`]);
    });
});
