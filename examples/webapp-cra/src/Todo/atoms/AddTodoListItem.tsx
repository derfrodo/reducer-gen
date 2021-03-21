import {
  createStyles,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React from "react";
import { useState } from "react";

const useAddTodoListItemStyles = makeStyles((t) =>
  createStyles({
    itemWithEvenMoreSecondaryActionSpace: {
      paddingRight: 64,
    },
  })
);

export const AddTodoListItem: React.FC<{}> = ({}) => {
  const classes = useAddTodoListItemStyles();
  const [task, setTask] = useState<string | undefined>(undefined);
  return (
    <ListItem classes={{ root: classes.itemWithEvenMoreSecondaryActionSpace }}>
      <TextField
        fullWidth
        placeholder="Enter task here"
        label="Add todo"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={task ?? ""}
        onChange={(e) => setTask(e.target.value)}
      ></TextField>
      <ListItemSecondaryAction>
        <IconButton disabled={(task?.length ?? 0) === 0} color="primary">
          <Add />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
