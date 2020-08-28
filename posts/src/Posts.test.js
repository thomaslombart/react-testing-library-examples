import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { addPost as addPostMock } from "./api";
import Posts from "./Posts";

jest.mock("./api");

describe("Posts", () => {
  test("adds a post", async () => {
    addPostMock.mockImplementation((post) =>
      Promise.resolve({ status: 200, data: { ...post, id: 1 } })
    );
    render(<Posts />);
    const title = screen.getByPlaceholderText(/title/i);
    const content = screen.getByPlaceholderText(/post/i);
    const button = screen.getByText(/post/i);
    const postTitle = "This is a post";
    const postContent = "This is the content of my post";

    fireEvent.change(title, { target: { value: postTitle } });
    fireEvent.change(content, { target: { value: postContent } });
    fireEvent.click(button);

    await screen.findByText(postTitle);
    screen.getByText(postContent);
  });

  test("add a post when it doesn't work", async () => {
    const errorMesssage = "Oh no. It didn't work!";
    addPostMock.mockImplementation(() =>
      Promise.reject({ status: 500, data: errorMesssage })
    );
    render(<Posts />);
    const title = screen.getByPlaceholderText(/title/i);
    const content = screen.getByPlaceholderText(/post/i);
    const button = screen.getByText(/post/i);
    const postTitle = "This is a post";
    const postContent = "This is the content of my post";

    fireEvent.change(title, { target: { value: postTitle } });
    fireEvent.change(content, { target: { value: postContent } });
    fireEvent.click(button);

    expect(button).toHaveTextContent("Posting");
    expect(button).toBeDisabled();

    await screen.findByText(errorMesssage);
  });
});
