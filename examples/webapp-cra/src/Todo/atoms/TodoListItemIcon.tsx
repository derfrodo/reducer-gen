import { IconButton, ListItemIcon } from "@material-ui/core";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React, { useCallback } from "react";
import { useTodoReducerContextDispatch, todoActionCreators } from "../reducer";
import { TodoData } from "../types/TodoData";

export const TodoListItemIcon: React.FC<{ todo: TodoData }> = ({ todo }) => {
  const { done } = todo;
  const dispatch = useTodoReducerContextDispatch();
  const onToggle = useCallback(() => {
    dispatch(
      todoActionCreators.todosUpdateItem(todo, {
        ...todo,
        done: !todo.done,
      })
    );
  }, [todo, dispatch]);
  return (
    <ListItemIcon>
      <IconButton onClick={onToggle}>
        {done ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
      </IconButton>
    </ListItemIcon>
  );
};
