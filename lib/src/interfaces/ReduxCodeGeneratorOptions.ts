export interface ReduxCodeGeneratorOptions {
    createContextDirectPropertyHooks: boolean;
    addFunctionalParametersForContextDispatch: boolean;
    addGetCurrentStateToContext: boolean;
    createReducerContext: boolean;
    addBubbleFlagForActions?: boolean;
    addArrayFunctions: boolean;
    decoupleStateChangedCallbackByTimeout: boolean;
    verbatimModuleSyntax: boolean;
}

export const getDefaultReduxCodeGeneratorOptions: (
    presets?: Partial<ReduxCodeGeneratorOptions>
) => ReduxCodeGeneratorOptions = (presets) => ({
    createContextDirectPropertyHooks: false,
    addFunctionalParametersForContextDispatch: false,
    addGetCurrentStateToContext: false,
    createReducerContext: false,
    addBubbleFlagForActions: false,
    addArrayFunctions: false,
    decoupleStateChangedCallbackByTimeout: false,
    verbatimModuleSyntax: true,
    ...(presets ?? {}),
});
