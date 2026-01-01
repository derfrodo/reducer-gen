import React from "react";
import TodoItem from "./Todo/TodoItem";
import { TodoReducerContextProvider } from "./Todo/reducer/ReducerContext.main.generated";

function App() {
  return (
    <TodoReducerContextProvider>
      <div className="App" data-testid="app-container">
        <header>
          <h1>Hello World!</h1>
        </header>
        <main>
          <p>Welcome to Vite + React!</p>
          <ul>
            <TodoItem />
          </ul>
        </main>
      </div>
    </TodoReducerContextProvider>
  );
}

export default App;
