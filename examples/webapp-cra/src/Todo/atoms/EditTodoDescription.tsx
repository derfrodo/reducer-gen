import {
  createStyles,
  IconButton,
  ListItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import React from "react";

const useEditTodoDescriptionStyles = makeStyles((t) =>
  createStyles({
    itemWithAdditionalInfos: {
      paddingLeft: t.spacing(9),
      paddingRight: t.spacing(2),
    },
  })
);

export const EditTodoDescription: React.FC<{
  currentDescription: string | null | undefined;
  setCurrentDescription: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  onUpdateTodo: () => void;
  originalDescription: string | null | undefined;
}> = ({
  currentDescription,
  setCurrentDescription,
  onUpdateTodo: updateTodo,
  originalDescription: description,
}) => {
  const classes = useEditTodoDescriptionStyles();
  return (
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
            updateTodo();
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
  );
};
