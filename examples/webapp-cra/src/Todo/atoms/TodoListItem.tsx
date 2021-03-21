import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import { TodoData } from "../types/TodoData";

export const TodoListItem: React.FC<{ data: TodoData }> = ({ data }) => {
  const { done, task, description } = data;
  return (
    <ListItem>
      <ListItemIcon>
        {done ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
      </ListItemIcon>
      <ListItemText
        color="primary"
        primary={task}
        secondary={description ?? undefined}
      />
    </ListItem>
  );
};
