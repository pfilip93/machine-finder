import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("cicking main button opens modal", () => {
  render(<App />);
  const button = screen.getByText(/Start inquiry/i);

  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(screen.getByText(/Direct request/i)).toBeInTheDocument();
});

test("clicking x button closes modal", () => {
  render(<App />);
  const button = screen.getByText(/Start inquiry/i);

  fireEvent.click(button);

  const x = screen.getByLabelText(/Close/i);

  fireEvent.click(x);

  expect(screen.queryByText(/Direct request/i)).not.toBeInTheDocument();
});
