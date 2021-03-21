import {
  Box,
  Collapse,
  createStyles,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React, { useCallback, useEffect, useState } from "react";
import { todoActionCreators, useTodoReducerContextDispatch } from "../reducer";
import { TodoData } from "../types/TodoData";
import { EditTodoButtons } from "../atoms/EditTodoButtons";
import { EditTodoDescription } from "../atoms/EditTodoDescription";
import { TodoListItemActions } from "../atoms/TodoListItemActions";
import { TodoTaskInput } from "../atoms/TodoTaskInput";

const useTodoListItemStyles = makeStyles((t) =>
  createStyles({
    itemWithEvenMoreSecondaryActionSpace: {
      paddingRight: t.spacing(9),
      transition: t.transitions.create("all", {
        duration: t.transitions.duration.short,
        easing: t.transitions.easing.easeInOut,
      }),
      "&$editMode": {
        paddingRight: t.spacing(2),
      },
    },
    editMode: {},
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

  const updateTodo = () => {
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
  const onReset = () => {
    setCurrentTask(task);
    setCurrentDescription(description);
    setInEditMode(false);
  };

  return (
    <>
      <ListItem
        dense
        classes={{
          root: `${classes.itemWithEvenMoreSecondaryActionSpace} ${
            inEditMode ? classes.editMode : ""
          }`,
        }}
      >
        <ListItemIcon>
          <IconButton disabled={inEditMode} onClick={onToggle}>
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
                    onUpdateTask: updateTodo,
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
                  {(description?.length ?? 0) > 0
                    ? description
                    : "-- no description --"}
                </Typography>
              </Box>
            </Collapse>
          }
        />
        <TodoListItemActions
          {...{
            todo: data,
            inEditMode,
            setInEditMode,
            onUpdateTodo: updateTodo,
          }}
        />
      </ListItem>
      <Collapse in={inEditMode} unmountOnExit timeout={20}>
        <EditTodoDescription
          {...{
            classes,
            currentDescription,
            setCurrentDescription,
            onUpdateTodo: updateTodo,
            originalDescription: description,
          }}
        />
        <EditTodoButtons onUpdateTodo={updateTodo} onReset={onReset} />
      </Collapse>
    </>
  );
};
