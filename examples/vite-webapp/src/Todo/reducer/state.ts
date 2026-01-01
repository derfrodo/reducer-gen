import { type TodoData } from "../types/TodoData";
import { type TodoCategory } from "../types/TodoCategory";

export interface State {
  todos: TodoData[];
  categories: TodoCategory[];
  currentData: TodoData | null;
  nextId: number;
}
