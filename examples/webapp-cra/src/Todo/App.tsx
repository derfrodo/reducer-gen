import {
  Container,
  createStyles,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import React from "react";
import { ApplicationHeader } from "./molecules/ApplicationHeader";
import { TodoPage } from "./pages/TodoPage";

const useAppStyles = makeStyles((t) =>
  createStyles({
    mainContainer: {
      paddingTop: t.spacing(4),
    },
  })
);
function App() {
  const classes = useAppStyles();
  return (
    <>
      <CssBaseline />
      <div className="App" data-testid="app-container">
        <ApplicationHeader />
        <main>
          <Container maxWidth="md" className={classes.mainContainer}>
            <TodoPage />
          </Container>
        </main>
      </div>
    </>
  );
}

export default App;
