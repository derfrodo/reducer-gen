import { TestType2 } from "../types/TestType2";

export default interface State {
    prop1: TestType2 | null;
    prop2: TestType2 | undefined;
    array: string[];
    str: string;
    boo: boolean;
    num: number;
}
