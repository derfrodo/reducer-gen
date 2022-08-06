import { Divider, List, useTheme } from "@material-ui/core";
import React from "react";
import { TodoStatePropertiesEnum } from "Todo/reducer/stateProperties.base.generated";
import { AddTodoListItem } from "../atoms/AddTodoListItem";
import { EmptyTodoListItem } from "../atoms/EmptyTodoListItem";
import { useNamedTodoStatePropertyValue } from "../reducer";
import { TodoData } from "../types/TodoData";
import { TodoListItem } from "./TodoListItem";

export const TodoList: React.FC<{ todos?: TodoData[] }> = ({
  todos: propertyTodos,
}) => {
  // const state = useTodoReducerContextState(); //alternative - the more redux way, I guess
  var stateTodos = useNamedTodoStatePropertyValue(TodoStatePropertiesEnum.todos);
  const todos = propertyTodos ?? stateTodos; // alternative - the more redux way, I guess: state.todos instead of stateTodos
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
