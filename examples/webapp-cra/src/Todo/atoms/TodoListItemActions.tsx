import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
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
        // <IconButton
        //   onClick={() => {
        //     onUpdateTask();
        //   }}
        // >
        //   <Check />
        // </IconButton>
        <IconButton onClick={() => setInEditMode(true)} disabled={inEditMode}>
          <Edit />
        </IconButton>
      )}
    </ListItemSecondaryAction>
  );
};
