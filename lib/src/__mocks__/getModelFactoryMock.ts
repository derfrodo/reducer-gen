/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModelFactory } from "../util/services/ModelFactory";
import createMockService from "./createMockService";

jest.mock("../util/services/ModelFactory");
export const getModelFactoryMock = () => {
    return createMockService(new (ModelFactory as any)() as ModelFactory);
};

export default getModelFactoryMock;
