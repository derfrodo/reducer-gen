import { Divider, List, useTheme } from "@material-ui/core";
import React from "react";
import { AddTodoListItem } from "../atoms/AddTodoListItem";
import { EmptyTodoListItem } from "../atoms/EmptyTodoListItem";
import { TodoListItem } from "../atoms/TodoListItem";
import { useTodoReducerContextState } from "../reducer";
import { TodoData } from "../types/TodoData";

export const TodoList: React.FC<{ todos?: TodoData[] }> = ({
  todos: propertyTodos,
}) => {
  const state = useTodoReducerContextState();
  const todos = propertyTodos ?? state.todos;
  const theme = useTheme();
  return (
    <List>
      {todos.length > 0 ? (
        todos.map((t, index) => {
          return <TodoListItem key={index} data={t} />;
        })
      ) : (
        <EmptyTodoListItem />
      )}

      <Divider style={{ marginBottom: theme.spacing(2) }} />
      <AddTodoListItem />
    </List>
  );
};
