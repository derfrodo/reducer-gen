import { Box, Button, ButtonGroup, ListItem } from "@material-ui/core";
import React from "react";

export const EditTodoButtons: React.FC<{
  onUpdateTodo: () => void;
  onReset: () => void;
}> = ({ onUpdateTodo: updateTodo, onReset }) => {
  return (
    <ListItem>
      <Box display="flex" justifyContent="flex-end" flex={1}>
        <ButtonGroup>
          <Button
            onClick={() => {
              updateTodo();
            }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              onReset();
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </ListItem>
  );
};
