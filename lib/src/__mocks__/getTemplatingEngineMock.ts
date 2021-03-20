/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplatingEngine } from "../templating/TemplatingEngine";
import createMockService from "./createMockService";

jest.mock("../templating/TemplatingEngine");
export const getTemplatingEngineMock = () => {
    return createMockService(
        new (TemplatingEngine as any)() as TemplatingEngine
    );
};

export default getTemplatingEngineMock;
