import type * as MockedTypes from "../TemplateModelFactory";

const actualTypes = jest.requireActual("../TemplateModelFactory");

export const getInitialPropertyValueMock = jest.fn();

const createActionCreatorsHandlebarModelMock = jest.fn();
const createActionsHandlebarModelMock = jest.fn();
const createReducerActionsHandlebarModelMock = jest.fn();
const createReducerHandlebarModelMock = jest.fn();
const createStateHandlebarModelMock = jest.fn();
const createStatePropertyHandlebarModelMock = jest.fn();
const addLevelToImportClauseMock = jest.fn();
const getImportClausesWithAdditionalLevelMock = jest.fn();
const createModuleNamesHandlebarModelMock = jest.fn();
const createHandlebarModelMock = jest.fn();

function TemplateModelFactory() {
    return {
        createActionCreatorsHandlebarModel: createActionCreatorsHandlebarModelMock,
        createActionsHandlebarModel: createActionsHandlebarModelMock,
        createReducerActionsHandlebarModel: createReducerActionsHandlebarModelMock,
        createReducerHandlebarModel: createReducerHandlebarModelMock,
        createStateHandlebarModel: createStateHandlebarModelMock,
        createStatePropertyHandlebarModel: createStatePropertyHandlebarModelMock,
        addLevelToImportClause: addLevelToImportClauseMock,
        getImportClausesWithAdditionalLevel: getImportClausesWithAdditionalLevelMock,
        createModuleNamesHandlebarModel: createModuleNamesHandlebarModelMock,
        createHandlebarModel: createHandlebarModelMock,
    };
}

const exportModule: typeof MockedTypes = {
    ...actualTypes,
    TemplateModelFactory: TemplateModelFactory,
    default: TemplateModelFactory,
};

module.exports = exportModule;
