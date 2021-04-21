import { TodoData } from "../types/TodoData";

export interface State {
  todos: TodoData[];
  // If you want, you may give messing around with nullables a try ;)
  // nullableTags: (string | number)[] | null;
  // undefinableNumbers: number[] | undefined;
}
