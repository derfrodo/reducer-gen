import { TestType } from "../types/TestType";

export interface State {
    prop1: TestType | null;
    prop2: TestType | undefined;
    array: string[];
    str: string;
    boo: boolean;
    num: number;
}
