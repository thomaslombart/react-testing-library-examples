import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    render(<Counter />);
    const counter = screen.getByText("0");
    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");

    fireEvent.click(incrementButton);
    screen.getByText("1");

    fireEvent.click(decrementButton);
    screen.getByText("0");
  });
});
