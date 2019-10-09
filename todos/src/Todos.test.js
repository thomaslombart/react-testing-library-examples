import React from 'react';
import { render, within, fireEvent } from "@testing-library/react"

import Todos from './Todos';

describe("Todos", () => {
  test("adds a new to-do", () => {
    const { getByPlaceholderText, getByText } = render(<Todos />)
    const input = getByPlaceholderText(/add something/i)
    const todo = "Read Master React Testing"
    getByText("No to-dos!")

    fireEvent.change(input, { target: { value: todo } })
    fireEvent.keyDown(input, { key: "Enter" })

    getByText(todo)
    expect(input).toHaveValue("")
  })

test("removes a to-do", () => {
  const todos = [{ name: "Read Master React Testing", done: false }, { name: "Buy groceries", done: true }, { name: "Walk the dog", done: false }]
  const { getByTestId, queryByText } = render(<Todos todos={todos} />)

  const removeButton = within(getByTestId("todo-1")).getByText(/remove/i)
  fireEvent.click(removeButton)

  expect(queryByText(todos[1].name)).not.toBeInTheDocument()
})

  test("marks a to-do as done", () => {
    const todos = [{ name: "Read Master React Testing", done: false }, { name: "Buy groceries", done: true }]
    const { getByTestId } = render(<Todos todos={todos} />)
    const firstTodoCheckbox = within(getByTestId("todo-0")).getByTestId("checkbox")
    expect(firstTodoCheckbox.checked).toBe(false)

    fireEvent.click(firstTodoCheckbox)

    expect(firstTodoCheckbox.checked).toBe(true)
  })

  test("filters to-dos", () => {
    const todos = [{ name: "Read Master React Testing", done: false }, { name: "Buy groceries", done: true }, { name: "Walk the dog", done: false }]
    const activeTodos = [todos[0], todos[2]]
    const doneTodo = todos[1]
    const { getByText, queryByText } = render(<Todos todos={todos} />)
    const activeFilter = getByText(/active/i)
    const doneFilter = getByText(/done/i)

    // displays all todos by default
    todos.forEach(todo => {
      expect(queryByText(todo.name)).toBeInTheDocument()
    })

    fireEvent.click(activeFilter)
    activeTodos.forEach(todo => {
      expect(queryByText(todo.name)).toBeInTheDocument()
    })
    expect(queryByText(doneTodo.name)).not.toBeInTheDocument()

    fireEvent.click(doneFilter)
    activeTodos.forEach(todo => {
      expect(queryByText(todo.name)).not.toBeInTheDocument()
    })
    expect(queryByText(doneTodo.name)).toBeInTheDocument()
  })
})
