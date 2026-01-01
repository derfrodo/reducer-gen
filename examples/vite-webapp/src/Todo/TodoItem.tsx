import React from "react";
import { todoActionCreators } from "./reducer";
import { useTodoReducerContextDispatch } from "./reducer/ReducerContext.main.generated";
import type { TodoData } from "./types/TodoData";

interface TodoItemProps {
  todo: TodoData;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
}) => {
  const dispatch = useTodoReducerContextDispatch();

  const handleClick = () => {
    dispatch(todoActionCreators.todosUpdateItem(todo, { ...todo, done: !todo.done }));
  };

  return (
    <li
      onClick={handleClick}
      style={{
        cursor: "pointer",
        textDecoration: todo.done ? "line-through" : "none",
      }}
    >
      {todo.task}
    </li>
  );
};

export default TodoItem;
