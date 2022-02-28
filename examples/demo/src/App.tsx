import React from "react";
import { AlertDemo } from "./demo/AlertDemo";

function App() {
  return (
    <div className="App" style={{ width: 1000, margin: "auto" }}>
      <header className="App-header">
        <h1>I am just a demonstration</h1>
      </header>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 40,
        }}
      >
        <AlertDemo />
      </div>
    </div>
  );
}

export default App;
