import FeatureModuleFileInfo from "./FeatureModuleFileInfo";

interface ReduxFeatureFilesCollection {
    action: FeatureModuleFileInfo;
    actionCreators: FeatureModuleFileInfo;
    defaultState: FeatureModuleFileInfo;
    reducerActions: FeatureModuleFileInfo;
}

export interface FeatureStateDataObject {
    pathToStateFile: string;
    folderToFeatureReducer: string;
    featureName: string;

    indexFile: FeatureModuleFileInfo;
    mainFiles?: ReduxFeatureFilesCollection;
    extensionFiles?: ReduxFeatureFilesCollection;
}

export default FeatureStateDataObject;
