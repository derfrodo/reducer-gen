/* eslint-disable @typescript-eslint/no-explicit-any */
import ReduxModuleNamingHelper from "../util/ReduxModuleNamingHelper";
import createMockService from "./createMockService";

jest.mock("../util/ReduxModuleNamingHelper");
export const getReduxModuleNamingHelperMock = () => {
    return createMockService(
        new (ReduxModuleNamingHelper as any)() as ReduxModuleNamingHelper
    );
};

export default getReduxModuleNamingHelperMock;
