import GeneratedReduxStateData from "../interfaces/GeneratedReduxStateData";
import ReduxModulFileGeneratorOptions from "../interfaces/ReduxModulFileGeneratorOptions";
import ReduxModulFileService from "./ReduxModulFileService";
import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import log from "loglevel";

export class ReduxModulFileGenerator {
    constructor(
        private options: ReduxModulFileGeneratorOptions,
        private fileService: ReduxModulFileService,
        private fileSystemHelper: FileSystemHelper = new FileSystemHelper()
    ) {
        this.options = options;
        this.writeGeneratedFiles = this.writeGeneratedFiles.bind(this);
    }

    async writeGeneratedFiles(
        generationData: GeneratedReduxStateData
    ): Promise<void[]> {
        const fsHelper = new FileSystemHelper();

        const { generatedBaseCodes, featureData } = generationData;
        const {
            actionCreators: actionCreatorsCode,
            actions: actionsCode,
            reducer: reducerCode,
            reducerActions: reducerActionsCode,
            defaultState: defaultStateCode,
        } = generatedBaseCodes;

        const { folderToFeatureReducer } = featureData;

        const {
            action,
            actionCreators,
            defaultState,
            reducer,
            reducerActions,
        } = this.fileService.getGeneratedFileNames();

        return Promise.all([
            fsHelper.writeFile(
                fsHelper.combinePath(folderToFeatureReducer, "actions", action),
                actionsCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(
                    folderToFeatureReducer,
                    "actionCreators",
                    actionCreators
                ),
                actionCreatorsCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(
                    folderToFeatureReducer,
                    "reducer",
                    reducer
                ),
                reducerCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(
                    folderToFeatureReducer,
                    "reducerActions",
                    reducerActions
                ),
                reducerActionsCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(folderToFeatureReducer, defaultState),
                defaultStateCode
            ),
        ]);
    }

    async writeExtendedFiles(
        generationData: GeneratedReduxStateData
    ): Promise<void[]> {
        const fsHelper = new FileSystemHelper();

        const { featureData, generatedExtendedCodes } = generationData;

        const { folderToFeatureReducer: folderToFeatureRedux } = featureData;

        const {
            actionCreators: actionCreatorsCode,
            actions: actionsCode,
            reducer: reducerCode,
            reducerActions: reducerActionsCode,
        } = generatedExtendedCodes;
        const {
            action,
            actionCreators,
            reducer,
            reducerActions,
        } = this.fileService.getExtensionFileNames();

        const actionsPath = fsHelper.combinePath(
            folderToFeatureRedux,
            "actions",
            action
        );
        const actionCreatorsPath = fsHelper.combinePath(
            folderToFeatureRedux,
            "actionCreators",
            actionCreators
        );
        const reducerPath = fsHelper.combinePath(
            folderToFeatureRedux,
            "reducer",
            reducer
        );
        const reducerActionsPath = fsHelper.combinePath(
            folderToFeatureRedux,
            "reducerActions",
            reducerActions
        );

        const actionsPathExist = await this.fileSystemHelper.pathExists(
            actionsPath
        );
        const actionCreatorsPathExist = await this.fileSystemHelper.pathExists(
            actionCreatorsPath
        );
        const reducerPathExist = await this.fileSystemHelper.pathExists(
            reducerPath
        );
        const reducerActionsPathExist = await this.fileSystemHelper.pathExists(
            reducerActionsPath
        );
        if (actionsPathExist) {
            log.info(
                `A file for extended actions already exists. No file will be created at "${actionsPath}."`
            );
        }
        if (actionCreatorsPathExist) {
            log.info(
                `A file for extended action creators already exists. No file will be created at "${actionCreatorsPath}."`
            );
        }
        if (reducerActionsPathExist) {
            log.info(
                `A file for extended reducer actions already exists. No file will be created at "${reducerActionsPath}."`
            );
        }
        if (reducerPathExist) {
            log.info(
                `A file for extended reducer already exists. No file will be createdat "${reducerPath}."`
            );
        }

        return Promise.all([
            ...(!actionsPathExist
                ? [fsHelper.writeFile(actionsPath, actionsCode)]
                : []),
            ...(!actionCreatorsPathExist
                ? [fsHelper.writeFile(actionCreatorsPath, actionCreatorsCode)]
                : []),
            ...(!reducerPathExist
                ? [fsHelper.writeFile(reducerPath, reducerCode)]
                : []),
            ...(!reducerActionsPathExist
                ? [fsHelper.writeFile(reducerActionsPath, reducerActionsCode)]
                : []),
        ]);
    }

    async writeMainFiles(
        generationData: GeneratedReduxStateData
    ): Promise<void[]> {
        const fsHelper = new FileSystemHelper();

        const { featureData, generatedMainCodes } = generationData;

        const { folderToFeatureReducer: folderToFeatureRedux } = featureData;
        const {
            actionCreators: actionCreatorsCode,
            actions: actionsCode,
            reducer: reducerCode,
            reducerActions: reducerActionsCode,
            index: indexCode,
            reducerContext: reducerContextCode,
        } = generatedMainCodes;

        const {
            action,
            actionCreators,
            reducer,
            reducerActions,
            index,
            reducerContext,
        } = this.fileService.getMainFileNames();

        const { createReducerContext } = this.options;

        return Promise.all([
            fsHelper.writeFile(
                fsHelper.combinePath(folderToFeatureRedux, "actions", action),
                actionsCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(
                    folderToFeatureRedux,
                    "actionCreators",
                    actionCreators
                ),
                actionCreatorsCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(folderToFeatureRedux, "reducer", reducer),
                reducerCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(
                    folderToFeatureRedux,
                    "reducerActions",
                    reducerActions
                ),
                reducerActionsCode
            ),
            fsHelper.writeFile(
                fsHelper.combinePath(folderToFeatureRedux, index),
                indexCode
            ),
            ...(createReducerContext
                ? [
                      fsHelper.writeFile(
                          fsHelper.combinePath(
                              folderToFeatureRedux,
                              reducerContext
                          ),
                          reducerContextCode
                      ),
                  ]
                : []),
        ]);
    }

    async writeIndexFile(
        generationData: GeneratedReduxStateData
    ): Promise<void> {
        const fsHelper = new FileSystemHelper();

        const { featureData, generatedIndexCode } = generationData;

        const { indexFile } = featureData;

        return fsHelper.writeFile(indexFile.filePath, generatedIndexCode);
    }
}

export default ReduxModulFileGenerator;
