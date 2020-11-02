/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReducerContextCodesGenerator } from "../util/services/ReducerContextCodesGenerator";
import createMockService from "./createMockService";

jest.mock("../util/services/ReducerContextCodesGenerator");
export const getReducerContextCodesGeneratorMock = () => {
    return createMockService(
        new (ReducerContextCodesGenerator as any)() as ReducerContextCodesGenerator
    );
};

export default getReducerContextCodesGeneratorMock;
