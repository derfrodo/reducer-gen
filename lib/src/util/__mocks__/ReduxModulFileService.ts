import type * as MockedTypes from "../ReduxModulFileService";

const actualTypes = jest.requireActual("../ReduxModulFileService");

export const getGeneratedFilesPrefixMock = jest.fn();
export const getGeneratedFilesSuffixMock = jest.fn();
export const getExtFilesPrefixMock = jest.fn();
export const getExtFilesSuffixMock = jest.fn();
export const getMainFilesPrefixMock = jest.fn();
export const getMainFilesSuffixMock = jest.fn();
export const getGeneratedModulNamesMock = jest.fn();
export const getGeneratedFileNamesMock = jest.fn();
export const getExtensionModulNamesMock = jest.fn();
export const getExtensionFileNamesMock = jest.fn();
export const getMainModulNamesMock = jest.fn();
export const getMainFileNamesMock = jest.fn();
export const getFilenamesWithExtensionMock = jest.fn();
export const getFilenameWithExtensionMock = jest.fn();
export const addLevelToImportClauseMock = jest.fn();
export const addCommentToImportClauseMock = jest.fn();
export const getCombinedReduxNamesMock = jest.fn();

function ReduxModulFileService() {
    return {
        getGeneratedFilesPrefix: getGeneratedFilesPrefixMock,
        getGeneratedFilesSuffix: getGeneratedFilesSuffixMock,
        getExtFilesPrefix: getExtFilesPrefixMock,
        getExtFilesSuffix: getExtFilesSuffixMock,
        getMainFilesPrefix: getMainFilesPrefixMock,
        getMainFilesSuffix: getMainFilesSuffixMock,
        getGeneratedModulNames: getGeneratedModulNamesMock,
        getGeneratedFileNames: getGeneratedFileNamesMock,
        getExtensionModulNames: getExtensionModulNamesMock,
        getExtensionFileNames: getExtensionFileNamesMock,
        getMainModulNames: getMainModulNamesMock,
        getMainFileNames: getMainFileNamesMock,
        getFilenamesWithExtension: getFilenamesWithExtensionMock,
        getFilenameWithExtension: getFilenameWithExtensionMock,
        addLevelToImportClause: addLevelToImportClauseMock,
        addCommentToImportClause: addCommentToImportClauseMock,
        getCombinedReduxNames: getCombinedReduxNamesMock,
    };
}

const exportModule: typeof MockedTypes = {
    ...actualTypes,
    __esModule: true,
    ReduxModulFileService: ReduxModulFileService,
};

module.exports = exportModule;
