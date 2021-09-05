import type * as MockedTypes from "../ReduxModuleNamingHelper";

const actualTypes = jest.requireActual("../ReduxModuleNamingHelper");

export const getDoNotOverwriteWarningMock = jest.fn();
export const getGeneralGenertedFileInformationMock = jest.fn();
export const addGeneratedHeaderMock = jest.fn();
export const getFeatureNameMock = jest.fn();
export const getActionStringsMock = jest.fn();
export const getActionStringMock = jest.fn();
export const getArrayActionStringsMock = jest.fn();
export const getGetDefaultStateMethodNameMock = jest.fn();
export const getReducerMethodNameMock = jest.fn();
export const getActionEnumNameMock = jest.fn();
export const getPascalCasedFeatureNameMock = jest.fn();
export const getActionCreatorsNameMock = jest.fn();
export const getReducerActionNameMock = jest.fn();
export const getReducerActionTypeGuardMethodNameMock = jest.fn();
export const getStateInterfaceNameMock = jest.fn();
export const getStateInterfaceImportLineMock = jest.fn();

function ReduxModuleNamingHelper() {
    return {
        getDoNotOverwriteWarning: getDoNotOverwriteWarningMock,
        getGeneralGenertedFileInformation: getGeneralGenertedFileInformationMock,
        addGeneratedHeader: addGeneratedHeaderMock,
        getFeatureName: getFeatureNameMock,
        getActionStrings: getActionStringsMock,
        getActionString: getActionStringMock,
        getArrayActionStrings: getArrayActionStringsMock,
        getGetDefaultStateMethodName: getGetDefaultStateMethodNameMock,
        getReducerMethodName: getReducerMethodNameMock,
        getActionEnumName: getActionEnumNameMock,
        getPascalCasedFeatureName: getPascalCasedFeatureNameMock,
        getActionCreatorsName: getActionCreatorsNameMock,
        getReducerActionName: getReducerActionNameMock,
        getReducerActionTypeGuardMethodName: getReducerActionTypeGuardMethodNameMock,
        getStateInterfaceName: getStateInterfaceNameMock,
        getStateInterfaceImportLine: getStateInterfaceImportLineMock,
    };
}

const exportModule: typeof MockedTypes = {
    ...actualTypes,
    ReduxModuleNamingHelper: ReduxModuleNamingHelper,
    default: ReduxModuleNamingHelper,
};

module.exports = exportModule;
