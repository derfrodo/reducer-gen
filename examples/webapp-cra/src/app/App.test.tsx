import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the app", async () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId("app-container")).toBeInTheDocument();
});
