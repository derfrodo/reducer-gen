export interface ReduxModuleNamingHelperOptions {
    addFeatureAsActionPrefix: boolean;
}

export function getDefaultReduxModuleNamingHelperOptions(): ReduxModuleNamingHelperOptions {
    return { addFeatureAsActionPrefix: false };
}
