import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import QuestionAnswerRounded from "@material-ui/icons/QuestionAnswerRounded";
import React from "react";

export const EmptyTodoListItem: React.FC<{}> = ({}) => {
  return (
    <ListItem>
      <ListItemIcon>
        <QuestionAnswerRounded />
      </ListItemIcon>
      <ListItemText
        color="primary"
        primary={"There is actually nothing to be done."}
      />
    </ListItem>
  );
};
