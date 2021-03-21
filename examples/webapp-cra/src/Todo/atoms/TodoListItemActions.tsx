import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import React from "react";
import { TodoData } from "../types/TodoData";

export const TodoListItemActions: React.FC<{
  todo: TodoData;
  setInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  inEditMode: boolean;
  onUpdateTodo: () => void;
}> = ({ todo, setInEditMode, inEditMode, onUpdateTodo: onUpdateTask }) => {
  return (
    <ListItemSecondaryAction>
      {inEditMode ? (
        <></>
      ) : (
        <IconButton onClick={() => setInEditMode(true)} disabled={inEditMode}>
          <Edit />
        </IconButton>
      )}
    </ListItemSecondaryAction>
  );
};
