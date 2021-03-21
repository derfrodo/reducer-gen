import { Card, CardContent, CardHeader } from "@material-ui/core";
import React from "react";
import { TodoList } from "../molecules/TodoList";
import { TodoReducerContextProvider } from "../reducer";

export const TodoPage: React.FC<{}> = () => {
  return (
    <TodoReducerContextProvider>
      <Card>
        <CardHeader title="Todos"></CardHeader>
        <CardContent>
          <TodoList />
        </CardContent>
      </Card>
    </TodoReducerContextProvider>
  );
};
