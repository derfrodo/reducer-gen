import { TodoData } from "../types/TodoData";

export interface State {
  todos: TodoData[];
  nullableTags: (string | number)[] | null;
  undefinableNumbers: number[] | undefined;
}
