import { StateAnalyzer } from "./util/StateAnalyzer";
import { ReduxCodeGenerator } from "./util/ReduxCodeGenerator";
import CliArgs from "./interfaces/CliArgs";
import FeatureStateDataObject from "./interfaces/FeatureStateDataObject";
import log from "loglevel";
import ReduxCodeGeneratorOptions from "./interfaces/ReduxCodeGeneratorOptions";
import StateAnalyzerOptions from "./interfaces/StateAnalyzerOptions";
import ReduxModulFileGenerator from "./util/ReduxModulFileGenerator";
import ReduxModulFileGeneratorOptions from "./interfaces/ReduxModulFileGeneratorOptions";
import ReduxModulFileService from "./util/ReduxModulFileService";
import ReduxModulFileServiceOptions from "./interfaces/ReduxModulFileServiceOptions";
import ReduxModuleNamingHelper from "./util/ReduxModuleNamingHelper";
import ReduxModuleNamingHelperOptions from "./interfaces/ReduxModuleNamingHelperOptions";
import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";

const getGeneratorOptionsFromArgs = (
    argv: CliArgs
): ReduxCodeGeneratorOptions => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createReducerContext, addBubbleFlagForActions } = argv;
    const result: ReduxCodeGeneratorOptions = {
        createReducerContext: createReducerContext,
        addBubbleFlagForActions:
            addBubbleFlagForActions === undefined ||
            addBubbleFlagForActions === true,
    };
    return result;
};
const getAnalyzerOptionsFromArgs = (argv: CliArgs): StateAnalyzerOptions => {
    // eslint-disable-next-line prettier/prettier
    const {} = argv;
    const result: StateAnalyzerOptions = {};
    return result;
};
const getFileGeneratorOptionsFromArgs = (
    argv: CliArgs
): ReduxModulFileGeneratorOptions => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { filesSuffix, filesPrefix, createReducerContext } = argv;
    const result: ReduxModulFileGeneratorOptions = {
        createReducerContext: createReducerContext,
    };
    return result;
};

const getFileServiceOptionsFromArgs = (
    argv: CliArgs
): ReduxModulFileServiceOptions => {
    const { filesSuffix, filesPrefix, mainFilesPrefix, mainFilesSuffix } = argv;
    const result: ReduxModulFileServiceOptions = {
        filesSuffix: filesSuffix,
        filesPrefix: filesPrefix,
        extendedFilesPrefix: "",
        extendedFilesSuffix: ".extended",
        mainFilesPrefix: mainFilesPrefix,
        mainFilesSuffix: mainFilesSuffix,
    };
    return result;
};

const getReduxModuleNamingHelperOptionsFromArgs = (
    argv: CliArgs
): ReduxModuleNamingHelperOptions => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { filesSuffix, filesPrefix } = argv;
    const result: ReduxModuleNamingHelperOptions = {
        addFeatureAsActionPrefix: true,
    };
    return result;
};

export const generate = async (argv: CliArgs): Promise<void> => {
    log.info("Generate Redux Default States");

    const generatorOptions = getGeneratorOptionsFromArgs(argv);

    const stateAnalyzer = new StateAnalyzer(getAnalyzerOptionsFromArgs(argv));
    const fileService = new ReduxModulFileService(
        getFileServiceOptionsFromArgs(argv)
    );

    const fileGenerator = new ReduxModulFileGenerator(
        getFileGeneratorOptionsFromArgs(argv),
        fileService
    );
    const reduxModuleNamingHelper = new ReduxModuleNamingHelper(
        getReduxModuleNamingHelperOptionsFromArgs(argv)
    );
    const codeGenerator = new ReduxCodeGenerator(
        generatorOptions,
        reduxModuleNamingHelper,
        fileService
    );
    const stateFilePaths = [
        ...(await new FileSystemHelper().findFiles("./src", "/redux/state.ts", {
            includeNested: true,
        })),
        ...(await new FileSystemHelper().findFiles(
            "./src",
            "/reducer/state.ts",
            { includeNested: true }
        )),
    ];
    const featureFSData: FeatureStateDataObject[] = await stateAnalyzer.createFeatureStateDataObjects(
        stateFilePaths
    );
    const stateInfos = await stateAnalyzer.analyseStateFiles(featureFSData);
    const generatedCodes = await codeGenerator.generateStateCodes(stateInfos);
    log.debug(JSON.stringify(generatedCodes));
    await Promise.all(
        generatedCodes.map((codes) => fileGenerator.writeGeneratedFiles(codes))
    );
    await Promise.all(
        generatedCodes.map((codes) => fileGenerator.writeExtendedFiles(codes))
    );
    await Promise.all(
        generatedCodes.map((codes) => fileGenerator.writeMainFiles(codes))
    );
    await Promise.all(
        generatedCodes.map((codes) => fileGenerator.writeIndexFile(codes))
    );
};

export default generate;
