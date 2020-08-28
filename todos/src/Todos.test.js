import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";

import Todos from "./Todos";

describe("Todos", () => {
  test("adds a new to-do", () => {
    render(<Todos />);
    const input = screen.getByPlaceholderText(/add something/i);
    const todo = "Read Master React Testing";

    screen.getByText("No to-dos!");

    fireEvent.change(input, { target: { value: todo } });
    fireEvent.keyDown(input, { key: "Enter" });

    screen.getByText(todo);
    expect(input).toHaveValue("");
  });

  test("removes a to-do", () => {
    const todos = [
      { name: "Read Master React Testing", done: false },
      { name: "Buy groceries", done: true },
      { name: "Walk the dog", done: false },
    ];
    render(<Todos todos={todos} />);

    const removeButton = within(screen.getAllByRole("listitem")[1]).getByText(
      /remove/i
    );
    fireEvent.click(removeButton);

    expect(screen.queryByText(todos[1].name)).not.toBeInTheDocument();
  });

  test("marks a to-do as done", () => {
    const todos = [
      { name: "Read Master React Testing", done: false },
      { name: "Buy groceries", done: true },
    ];
    render(<Todos todos={todos} />);
    const firstTodoCheckbox = screen.getByLabelText(todos[0].name);

    expect(firstTodoCheckbox.checked).toBe(false);

    fireEvent.click(firstTodoCheckbox);

    expect(firstTodoCheckbox.checked).toBe(true);
  });

  test("filters to-dos", () => {
    const todos = [
      { name: "Read Master React Testing", done: false },
      { name: "Buy groceries", done: true },
      { name: "Walk the dog", done: false },
    ];
    const activeTodos = [todos[0], todos[2]];
    const doneTodo = todos[1];
    render(<Todos todos={todos} />);

    const activeFilter = screen.getByText(/active/i);
    const doneFilter = screen.getByText(/done/i);

    // displays all todos by default
    todos.forEach((todo) => {
      expect(screen.queryByText(todo.name)).toBeInTheDocument();
    });

    fireEvent.click(activeFilter);
    activeTodos.forEach((todo) => {
      expect(screen.queryByText(todo.name)).toBeInTheDocument();
    });
    expect(screen.queryByText(doneTodo.name)).not.toBeInTheDocument();

    fireEvent.click(doneFilter);
    activeTodos.forEach((todo) => {
      expect(screen.queryByText(todo.name)).not.toBeInTheDocument();
    });
    expect(screen.queryByText(doneTodo.name)).toBeInTheDocument();
  });
});
