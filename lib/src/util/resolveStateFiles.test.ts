import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { CliArgs } from "../interfaces/CliArgs";
import { resolveStateFiles } from "./resolveStateFiles";

describe("resolveStateFiles tests", () => {
    it("Integration: resolveStateFiles uses filesystem helper", async () => {
        const cliArgs: CliArgs = {
            stateFilesPattern: ["srcSimpleState/simpleState/reducer/state.ts"],
            srcFolder: "./testData/srcSimpleState",
        } as CliArgs;

        const result = await resolveStateFiles(cliArgs);

        expect(result).toEqual(["./testData/srcSimpleState/simpleState/reducer/state.ts"]);
    });

    it("resolveStateFiles uses filesystem helper", async () => {
        const cliArgs: CliArgs = {
            stateFilesPattern: ["state.ts"],
            srcFolder: "./testData/srcSimpleState",
        } as CliArgs;

        const helper = {
            findFiles: jest.fn().mockImplementation((a) => `Searched in ${a}`),
        } as unknown as FileSystemHelper;

        const result = await resolveStateFiles(cliArgs, helper);

        expect(result).toEqual([`Searched in ./testData/srcSimpleState`]);
    });

    

    it("resolveStateFiles uses filesystem helper", async () => {
        const cliArgs: CliArgs = {
            stateFilesPattern: ["state.ts"],
            srcFolder: "./testData/srcSimpleState",
        } as CliArgs;

        const helper = {
            findFiles: jest.fn().mockImplementation((a) => `Searched in ${a}`),
        } as unknown as FileSystemHelper;

        const result = await resolveStateFiles(cliArgs, helper);

        expect(result).toEqual([`Searched in ./testData/srcSimpleState`]);
    });

    
});
