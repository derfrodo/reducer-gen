import { TodoData } from "../types/TodoData";

export interface State {
  todos: TodoData[];
  activeTodo: TodoData | null;
  // If you want, you may give messing around with nullables a try ;)
  // nullableTags: (string | number)[] | null;
  // undefinableNumbers: number[] | undefined;
}
