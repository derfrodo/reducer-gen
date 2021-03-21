import {
  Container,
  Typography
} from "@material-ui/core";
import React from "react";
import { TodoPage } from "./pages/TodoPage";

function App() {
  return (
    <div className="App" data-testid="app-container">
      <header className="App-header">
        <Typography variant="h1">Todo Reducer Demo</Typography>
      </header>
      <main>
        <Container maxWidth="md">
          <TodoPage />
        </Container>
      </main>
    </div>
  );
}

export default App;
