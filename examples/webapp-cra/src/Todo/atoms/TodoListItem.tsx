import {
  Box,
  Collapse,
  createStyles,
  Fade,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React, { useCallback, useEffect, useState } from "react";
import { TodoData } from "../types/TodoData";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import { todoActionCreators, useTodoReducerContextDispatch } from "../reducer";
import { TodoTaskInput } from "./TodoTaskInput";

const useTodoListItemStyles = makeStyles((t) =>
  createStyles({
    itemWithEvenMoreSecondaryActionSpace: {
      paddingRight: t.spacing(9),
    },
    itemWithAdditionalInfos: {
      paddingLeft: t.spacing(9),
      paddingRight: t.spacing(2),
    },
    entryContent: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "block",
    },
    entryContentInput: {},
  })
);

export const TodoListItem: React.FC<{ data: TodoData }> = ({ data }) => {
  const { done, task, description } = data;
  const classes = useTodoListItemStyles();
  const dispatch = useTodoReducerContextDispatch();

  const [inEditMode, setInEditMode] = useState<boolean>(false);
  const [currentDescription, setCurrentDescription] = useState<
    string | undefined | null
  >();

  const [currentTask, setCurrentTask] = useState<string | undefined | null>();

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  useEffect(() => {
    setCurrentDescription(description);
  }, [description]);

  const updateTask = () => {
    if (currentTask) {
      dispatch(
        todoActionCreators.todosUpdateItem(data, {
          ...data,
          task: currentTask ?? "",
          description: currentDescription ?? "",
        })
      );
      setInEditMode(false);
    }
  };

  const onToggle = useCallback(() => {
    dispatch(
      todoActionCreators.todosUpdateItem(data, {
        ...data,
        done: !data.done,
      })
    );
  }, [data, dispatch]);

  return (
    <>
      <ListItem
        dense
        classes={{ root: classes.itemWithEvenMoreSecondaryActionSpace }}
      >
        <ListItemIcon onClick={onToggle}>
          <IconButton>
            {done ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
          </IconButton>
        </ListItemIcon>
        <ListItemText
          color="primary"
          primary={
            <>
              {inEditMode ? (
                <TodoTaskInput
                  {...{
                    currentTask,
                    onSetCurrentTask: setCurrentTask,
                    onUpdateTask: updateTask,
                    originalTask: task,
                  }}
                />
              ) : (
                <Typography variant="body1" className={classes.entryContent}>
                  {task}
                </Typography>
              )}
            </>
          }
          secondary={
            <Collapse in={!inEditMode} unmountOnExit timeout={20}>
              <Box position="relative" height={"1rem"}>
                <Typography variant="caption" className={classes.entryContent}>
                  {description ?? "-- no description --"}
                </Typography>
              </Box>
            </Collapse>
          }
        />
        <ListItemSecondaryAction>
          {inEditMode ? (
            <IconButton
              onClick={() => {
                updateTask();
              }}
            >
              <Check />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setInEditMode(true)}
              disabled={inEditMode}
            >
              <Edit />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={inEditMode} unmountOnExit timeout={20}>
        <ListItem classes={{ root: classes.itemWithAdditionalInfos }}>
          <TextField
            fullWidth
            placeholder="Enter description"
            label="Description"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={currentDescription ?? ""}
            onChange={(e) => setCurrentDescription(e.target.value)}
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
                      setCurrentDescription(description);
                    }}
                  >
                    <Clear />
                  </IconButton>
                </>
              ),
            }}
          ></TextField>
        </ListItem>
      </Collapse>
    </>
  );
};
