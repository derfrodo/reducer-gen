/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateModelFactory } from "../util/services/TemplateModelFactory";
import createMockService from "./createMockService";

jest.mock("../util/services/TemplateModelFactory");
export const getTemplateModelFactory = () => {
    return createMockService(
        new (TemplateModelFactory as any)() as TemplateModelFactory
    );
};

export default getTemplateModelFactory;
