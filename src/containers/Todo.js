import React from 'react';
import Todolist from '../components/Todolist/Todolist';

function createString(n) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push({ id: i, text: `Задача ${i}`, done: false });
  }
  return arr;
}

class Todo extends React.Component {
  state = {
    todoItem: createString(3),
  };

  consoleClick(n) {
    console.log(n);
  }

  onClickTodo(item) {
    console.log(item);
  }

  render() {
    return (
      <div>
        <Todolist
          todoItem={this.state.todoItem}
          onClickTodo={this.onClickTodo}
        />
        {/* <div onClick={this.consoleClick.bind(this)}>Консоль</div> */}
      </div>
    );
  }
}

export default Todo;
