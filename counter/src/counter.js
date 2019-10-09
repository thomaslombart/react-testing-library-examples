import React from "react";

class Counter extends React.Component {
  state = {
    count: 0
  }

  increment = () =>
    this.setState(({ count }) => ({ count: count + 1 }))

  decrement = () =>
    this.setState(({ count }) => ({ count: count - 1 }))

  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}

export default Counter