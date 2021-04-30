export interface ReduxCodeGeneratorOptions {
    createReducerContext: boolean;
    addBubbleFlagForActions?: boolean;
    addArrayFunctions: boolean;
    decoupleStateChangedCallbackByTimeout: boolean;
}

export default ReduxCodeGeneratorOptions;
