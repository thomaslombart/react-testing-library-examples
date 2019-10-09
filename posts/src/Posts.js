import React from 'react';

import { addPost } from "./api"

function Posts() {
  const [posts, addLocalPost] = React.useReducer((s, a) => [...s, a], [])
  const [formData, setFormData] = React.useReducer((s, a) => ({ ...s, ...a }), { title: "", content: "" })
  const [isPosting, setIsPosting] = React.useState(false)
  const [error, setError] = React.useState("")

  const post = async (e) => {
    e.preventDefault()

    setError("")

    if (!formData.title || !formData.content) {
      return setError("Title and content are required.")
    }

    try {
      setIsPosting(true);
      const { status, data: { id, ...rest } } = await addPost(formData)
      if (status === 200) {
        addLocalPost({ id, ...rest })
      }
      setIsPosting(false)
    } catch (error) {
      setError(error.data)
      setIsPosting(false)
    }
  }

  return (
    <div>
      <form className="form" onSubmit={post}>
        <h2>Say something</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Your title" onChange={e => setFormData({ title: e.target.value })} />
        <textarea type="text" placeholder="Your post" onChange={e => setFormData({ content: e.target.value })} rows={5} />
        <button className="btn" type="submit" disabled={isPosting}>Post{isPosting ? "ing..." : ""}</button>
      </form>
      <div>
        {posts.map(post => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
