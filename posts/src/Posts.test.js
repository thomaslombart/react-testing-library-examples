import React from 'react';
import { render, fireEvent } from "@testing-library/react"

import { addPost as addPostMock } from "./api"
import Posts from './Posts';

jest.mock("./api")

describe("Posts", () => {
  test('adds a post', async () => {
    addPostMock.mockImplementation(post => {
      return Promise.resolve({ status: 200, data: { ...post, id: 1 } })
    })
    const { getByPlaceholderText, getByText, findByText } = render(<Posts />)
    const title = getByPlaceholderText(/title/i)
    const content = getByPlaceholderText(/post/i)
    const button = getByText(/post/i)
    const postTitle = "This is a post"
    const postContent = "This is the content of my post"

    fireEvent.change(title, { target: { value: postTitle } })
    fireEvent.change(content, { target: { value: postContent } })
    fireEvent.click(button)

    await findByText(postTitle)
    getByText(postContent)
  });

  test("add a post when it doesn't work", async () => {
    const errorMesssage = "Oh no. It didn't work!"
    addPostMock.mockImplementation(() => {
      return Promise.reject({ status: 500, data: errorMesssage })
    })
    const { getByPlaceholderText, getByText, findByText } = render(<Posts />)
    const title = getByPlaceholderText(/title/i)
    const content = getByPlaceholderText(/post/i)
    const button = getByText(/post/i)
    const postTitle = "This is a post"
    const postContent = "This is the content of my post"

    fireEvent.change(title, { target: { value: postTitle } })
    fireEvent.change(content, { target: { value: postContent } })
    fireEvent.click(button)

    expect(button).toHaveTextContent("Posting")
    expect(button).toBeDisabled()

    await findByText(errorMesssage)
  })
})
