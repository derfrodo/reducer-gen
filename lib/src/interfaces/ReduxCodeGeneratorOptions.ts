export interface ReduxCodeGeneratorOptions {
    createReducerContext: boolean;
    addBubbleFlagForActions?: boolean;
    addArrayFunctions: boolean;
    decoupleStateChangedCallbackByTimeout: boolean;
}

export const getDefaultReduxCodeGeneratorOptions: (
    presets?: Partial<ReduxCodeGeneratorOptions>
) => ReduxCodeGeneratorOptions = (presets) => ({
    createReducerContext: false,
    addBubbleFlagForActions: false,
    addArrayFunctions: false,
    decoupleStateChangedCallbackByTimeout: false,
    ...(presets ?? {}),
});
