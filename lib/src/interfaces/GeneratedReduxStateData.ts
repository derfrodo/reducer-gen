import type { StateInterfaceInfo } from "./StateInterfaceInfo";
import type { FeatureStateDataObject } from "./FeatureStateDataObject";

export interface ReduxCodes {
    actions: string;
    actionCreators: string;
    reducer: string;
    reducerActions: string;
}

export interface GeneratedReduxStateData {
    featureData: FeatureStateDataObject;
    stateInfo: StateInterfaceInfo;

    generatedIndexCode: string;
    generatedBaseCodes: ReduxCodes & { defaultState: string; stateProperties: string };
    generatedMainCodes: ReduxCodes & { index: string; reducerContext: string };
    generatedExtendedCodes: ReduxCodes;
}

export default GeneratedReduxStateData;
