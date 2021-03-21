import {
  createStyles,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import React from "react";

const useTodoTaskInputStyles = makeStyles((t) =>
  createStyles({
    entryContent: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "block",
    },
  })
);

export const TodoTaskInput: React.FC<{
  currentTask: string | null | undefined;
  onSetCurrentTask: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  onUpdateTask: () => void;
  originalTask: string;
  label?: string;
}> = ({
  label,
  currentTask,
  onSetCurrentTask: setCurrentTask,
  onUpdateTask: updateTask,
  originalTask: task,
}) => {
  const classes = useTodoTaskInputStyles();
  return (
    <TextField
      classes={{
        root: `${classes.entryContent}`,
      }}
      fullWidth
      placeholder="What has to be done?"
      label={label ?? "Todo"}
      variant="standard"
      InputLabelProps={{ shrink: true }}
      value={currentTask ?? ""}
      onChange={(e) => setCurrentTask(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          updateTask();
        }
      }}
      InputProps={{
        endAdornment: (
          <>
            <IconButton
              onClick={() => {
                setCurrentTask(task);
              }}
            >
              <Clear />
            </IconButton>
          </>
        ),
      }}
    ></TextField>
  );
};
