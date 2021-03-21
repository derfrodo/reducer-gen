import { List } from "@material-ui/core";
import React from "react";
import { TodoListItem } from "../atoms/TodoListItem";
import { useTodoReducerContextState } from "../reducer";
import { TodoData } from "../types/TodoData";

export const TodoList: React.FC<{ todos?: TodoData[] }> = ({
  todos: propertyTodos,
}) => {
  const state = useTodoReducerContextState();
  const todos = propertyTodos ?? state.todos;
  return (
    <List>
      {todos.map((t, index) => {
        return <TodoListItem key={index} data={t} />;
      })}
    </List>
  );
};
