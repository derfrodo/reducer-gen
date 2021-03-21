/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateModelFactory } from "../util/services/TemplateModelFactory";
import createMockService from "./createMockService";

jest.mock("../util/services/ModelFactory");
export const getModelFactoryMock = () => {
    return createMockService(new (TemplateModelFactory as any)() as TemplateModelFactory);
};

export default getModelFactoryMock;
