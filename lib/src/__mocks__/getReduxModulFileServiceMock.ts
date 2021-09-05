/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReduxModulFileService } from "../util/ReduxModulFileService";
import createMockService from "./createMockService";

jest.mock("../util/ReduxModulFileService");
export const getReduxModulFileServiceMock = () => {
    return createMockService(
        new (ReduxModulFileService as any)() as ReduxModulFileService
    );
};

export default getReduxModulFileServiceMock;
