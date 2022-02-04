import { TodoData } from "../types/TodoData";
import { TodoCategory } from "Todo/types/TodoCategory";

export interface State {
  todos: TodoData[];
  categories: TodoCategory[];
  // If you want, you may give messing around with nullables a try ;)
  // nullableTags: (string | number)[] | null;
  undefinableNumbers: number[] | null;
  undefinableNumber: number | null;
  currentData: TodoData | null;
}
