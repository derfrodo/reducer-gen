import type * as MockedTypes from "../StateService";

const actualTypes = jest.requireActual("../StateService");

export const getInitialPropertyValueMock = jest.fn();

function StateService() {
    return {
        getInitialPropertyValue: getInitialPropertyValueMock,
    };
}

const exportModule: typeof MockedTypes = {
    ...actualTypes,
    StateService: StateService,
    default: StateService,
};

module.exports = exportModule;
