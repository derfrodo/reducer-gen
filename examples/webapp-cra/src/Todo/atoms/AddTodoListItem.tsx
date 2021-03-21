import {
  createStyles,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React, { useCallback, useMemo, useState } from "react";
import { todoActionCreators, useTodoReducerContextDispatch } from "../reducer";
import { TodoTaskInput } from "./TodoTaskInput";

const useAddTodoListItemStyles = makeStyles((t) =>
  createStyles({
    itemWithEvenMoreSecondaryActionSpace: {
      paddingRight: t.spacing(9),
    },
  })
);

export const AddTodoListItem: React.FC<{}> = () => {
  const classes = useAddTodoListItemStyles();
  const dispatch = useTodoReducerContextDispatch();
  const [task, setTask] = useState<string | null | undefined>(undefined);

  const hasInput = useMemo(() => (task?.length ?? 0) > 0, [task]);
  const onAddTodo = useCallback(
    (task: string) => {
      dispatch(
        todoActionCreators.todosAddItem({
          done: false,
          task,
        })
      );
    },
    [dispatch]
  );

  return (
    <ListItem classes={{ root: classes.itemWithEvenMoreSecondaryActionSpace }}>
      <TodoTaskInput
        currentTask={task}
        onSetCurrentTask={setTask}
        onUpdateTask={() => {
          if (task) {
            onAddTodo(task);
            setTask(undefined);
          }
        }}
        originalTask={""}
      />
      <ListItemSecondaryAction>
        <IconButton
          disabled={!hasInput}
          color="primary"
          onClick={() => {
            if (task) {
              onAddTodo(task);
              setTask(undefined);
            }
          }}
        >
          <Add />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
