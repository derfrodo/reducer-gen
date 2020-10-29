import StateInterfaceInfo from "./StateInterfaceInfo";
import FeatureStateDataObject from "./FeatureStateDataObject";

interface ReduxCodes {
    actions: string;
    actionCreators: string;
    reducer: string;
    reducerActions: string;
}

export interface GeneratedReduxStateData {
    featureData: FeatureStateDataObject;
    stateInfo: StateInterfaceInfo;

    generatedIndexCode: string;
    generatedBaseCodes: ReduxCodes & { defaultState: string };
    generatedMainCodes: ReduxCodes & { index: string; reducerContext: string };
    generatedExtendedCodes: ReduxCodes;
}

export default GeneratedReduxStateData;
