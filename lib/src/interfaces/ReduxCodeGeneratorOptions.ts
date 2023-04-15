export interface ReduxCodeGeneratorOptions {
    createContextDirectPropertyHooks: boolean;
    addGetCurrentStateToContext: boolean;
    createReducerContext: boolean;
    addBubbleFlagForActions?: boolean;
    addArrayFunctions: boolean;
    decoupleStateChangedCallbackByTimeout: boolean;
}

export const getDefaultReduxCodeGeneratorOptions: (
    presets?: Partial<ReduxCodeGeneratorOptions>
) => ReduxCodeGeneratorOptions = (presets) => ({
    createContextDirectPropertyHooks: false,
    addGetCurrentStateToContext: false,
    createReducerContext: false,
    addBubbleFlagForActions: false,
    addArrayFunctions: false,
    decoupleStateChangedCallbackByTimeout: false,
    ...(presets ?? {}),
});
