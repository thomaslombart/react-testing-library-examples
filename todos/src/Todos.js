import React from "react";

function Todos({ todos: originalTodos }) {
  const filters = ["all", "active", "done"];
  const [input, setInput] = React.useState("");
  const [todos, setTodos] = React.useState(originalTodos || []);
  const [activeFilter, setActiveFilter] = React.useState(filters[0]);

  const addTodo = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      setTodos((todos) => [{ name: input, done: false }, ...todos]);
      setInput("");
    }
  };

  const filteredTodos = React.useMemo(
    () =>
      todos.filter((todo) => {
        if (activeFilter === "all") {
          return todo;
        }

        if (activeFilter === "active") {
          return !todo.done;
        }

        return todo.done;
      }),
    [todos, activeFilter]
  );

  const toggle = (index) => {
    setTodos((todos) =>
      todos.map((todo, i) =>
        index === i ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const remove = (index) => {
    setTodos((todos) => todos.filter((todo, i) => i !== index));
  };

  return (
    <div>
      <h2 className="title">To-dos</h2>
      <input
        className="input"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTodo}
        value={input}
        placeholder="Add something..."
      />
      <ul className="list-todo">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(({ name, done }, i) => (
            <li key={`${name}-${i}`} className="todo-item">
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggle(i)}
                id={`todo-${i}`}
              />
              <div className="todo-infos">
                <label
                  htmlFor={`todo-${i}`}
                  className={`todo-name ${done ? "todo-name-done" : ""}`}
                >
                  {name}
                </label>
                <button className="todo-delete" onClick={() => remove(i)}>
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-results">No to-dos!</p>
        )}
      </ul>
      <ul className="list-filters">
        {filters.map((filter) => (
          <li
            key={filter}
            className={`filter ${
              activeFilter === filter ? "filter-active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
