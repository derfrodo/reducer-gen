import {
    FileSystemHelper,
    StringHelper,
} from "@derfrodo/frodo-s-little-helpers/dist/node";
import log from "loglevel";
import type { CliArgs } from "./interfaces/CliArgs";
import FeatureStateDataObject from "./interfaces/FeatureStateDataObject";
import {
    getDefaultReduxCodeGeneratorOptions,
    ReduxCodeGeneratorOptions,
} from "./interfaces/ReduxCodeGeneratorOptions";
import type { ReduxModuleNamingHelperOptions } from "./interfaces/ReduxModuleNamingHelperOptions";
import type { ReduxModulFileGeneratorOptions } from "./interfaces/ReduxModulFileGeneratorOptions";
import {
    getDefaultReduxModulFileServiceOptions,
    ReduxModulFileServiceOptions,
} from "./interfaces/ReduxModulFileServiceOptions";
import type { StateAnalyzerOptions } from "./interfaces/StateAnalyzerOptions";
import { ReduxCodeGenerator } from "./util/ReduxCodeGenerator";
import { ReduxModuleNamingHelper } from "./util/ReduxModuleNamingHelper";
import { ReduxModulFileGenerator } from "./util/ReduxModulFileGenerator";
import { ReduxModulFileService } from "./util/ReduxModulFileService";
import { resolveStateFiles } from "./util/resolveStateFiles";
import { ReactNativeAppHooksCodesGenerator } from "./util/services/ReactNativeAppHooksCodesGenerator";
import { SyncStateActionCodesGenerator } from "./util/services/SyncStateActionCodesGenerator";
import { WebAppHooksCodesGeneratorGenerator } from "./util/services/WebAppHooksCodesGenerator";
import { StateAnalyzer } from "./util/StateAnalyzer";

const getGeneratorOptionsFromArgs = (
    argv: CliArgs
): ReduxCodeGeneratorOptions => {
    const {
        createReducerContext,
        addBubbleFlagForActions,
        addArrayFunctions,
        decoupleStateChangedCallbackByTimeout,
        createContextDirectPropertyHooks,
        addGetCurrentStateToContext,
        addFunctionalParametersForContextDispatch,
    } = argv;
    const result: ReduxCodeGeneratorOptions = {
        ...getDefaultReduxCodeGeneratorOptions(),
        createContextDirectPropertyHooks: createContextDirectPropertyHooks,
        addFunctionalParametersForContextDispatch,
        addGetCurrentStateToContext: addGetCurrentStateToContext,
        createReducerContext: createReducerContext,
        addBubbleFlagForActions:
            addBubbleFlagForActions === undefined ||
            addBubbleFlagForActions === true,
        addArrayFunctions,
        decoupleStateChangedCallbackByTimeout:
            decoupleStateChangedCallbackByTimeout ?? false,
    };
    return result;
};
const getAnalyzerOptionsFromArgs = (argv: CliArgs): StateAnalyzerOptions => {
    const { srcFolder, analyseLiteralTypes: literalTypesAsObject } = argv;
    const result: StateAnalyzerOptions = {
        srcFolder,
        analyseLiteralTypes: literalTypesAsObject,
    };
    return result;
};
const getFileGeneratorOptionsFromArgs = (
    argv: CliArgs
): ReduxModulFileGeneratorOptions => {
    const { createReducerContext } = argv;
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
        ...getDefaultReduxModulFileServiceOptions(),
        filesSuffix: filesSuffix,
        filesPrefix: filesPrefix,
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
        new StringHelper(),
        reduxModuleNamingHelper,
        fileService
    );
    await codeGenerator.initialize();
    log.debug(`Seraching for state files in "${argv.srcFolder}"`);
    const stateFilePaths = await resolveStateFiles(argv);

    const featureFSData: FeatureStateDataObject[] =
        await stateAnalyzer.createFeatureStateDataObjects(stateFilePaths);
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

    if (argv.generateSyncStateActions) {
        const codeGen = new SyncStateActionCodesGenerator(
            {},
            reduxModuleNamingHelper,
            fileService
        );
        const code = codeGen.generateSyncStateActionsContent();
        const fsHelper = new FileSystemHelper();

        await fsHelper.writeFile(
            fsHelper.combinePath("./src", "syncState", "index.generated.ts"),
            code
        );
    }
    if (argv.generateWebAppHybridHooks) {
        if (!argv.generateSyncStateActions) {
            throw new Error(
                "Sync State Actions has to be generated to generate hybrid webapp hooks. Please add --generateSyncStateActions"
            );
        }
        const codeGen = new WebAppHooksCodesGeneratorGenerator(
            {},
            reduxModuleNamingHelper,
            fileService
        );
        const code = codeGen.generateHybridWebAppHooksContent();
        const fsHelper = new FileSystemHelper();

        await fsHelper.writeFile(
            fsHelper.combinePath(
                "./src",
                "syncState",
                "hybridWebappHooks.generated.ts"
            ),
            code
        );
    }
    if (argv.generateReactNativeHybridHooks) {
        if (!argv.generateSyncStateActions) {
            throw new Error(
                "Sync State Actions has to be generated to generate hybrid react native hooks. Please add --generateSyncStateActions"
            );
        }
        const codeGen = new ReactNativeAppHooksCodesGenerator(
            {},
            reduxModuleNamingHelper,
            fileService
        );
        const code = codeGen.generateHybridReactNativeHooksContent();
        const fsHelper = new FileSystemHelper();

        await fsHelper.writeFile(
            fsHelper.combinePath(
                "./src",
                "syncState",
                "hybridReactNativeHooks.generated.ts"
            ),
            code
        );
    }
};

export default generate;
