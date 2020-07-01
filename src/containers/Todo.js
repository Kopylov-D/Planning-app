import React from 'react';
import Todolist from '../components/Todolist/Todolist';

function createString(n) {
  let arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push({ id: i, text: `Задача ${i}`, done: false, main: false });
  }
  return arr;
}

class Todo extends React.Component {
  state = {
    todoName: this.props.todoName,
    todoItem: {
      todo: [
        { id: 0, text: `Задача 1`, done: false, main: true },
        { id: 1, text: `Задача 2`, done: false, main: false },
        { id: 2, text: `Задача 3`, done: false, main: true },
      ],
      subtasksIsOpen: false,
    },
  };

  consoleClick = (n) => {
    console.log(this.state);
    console.log(this.props);
  };

  onClickTodo(item) {}

  onChangeInput = (event, id) => {};

  onKeyEnter = (event, id) => {
    if (event.key === 'Enter' && event.target.value) {
      const todoItem = { ...this.state.todoItem };
      const todo = todoItem.todo;
      todo.push({
        id: id + 1,
        text: event.target.value,
        done: false,
        main: true,
      });
      todoItem.todo = todo

      this.setState({
        todoItem,
      });
      event.target.value = '';
    }
  };

  onClickDeleteHandler = (id) => {
    const todoItem = { ...this.state.todoItem };
    let todo = todoItem.todo;

    todo = todo.filter((item) => item.id !== id);
    todoItem.todo = todo
    this.setState({
      todoItem
    });
  };

  onCheckedHandler = (id) => {
    const todoItem = [...this.state.todoItem.todo];

    this.setState(
      todoItem.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      })
    );
  };

  render() {
    return (
      <div>
        <Todolist
          todo={this.state.todoItem.todo}
          todoName={this.state.todoName}
          subtasksIsOpen={this.state.todoItem.subtasksIsOpen}
          onClickTodo={this.onClickTodo}
          onChangeInput={this.onChangeInput}
          onKeyEnter={this.onKeyEnter}
          onClickDelete={this.onClickDeleteHandler}
          onChecked={this.onCheckedHandler}
        />
        <div onClick={this.consoleClick}>Консоль</div>
      </div>
    );
  }
}

export default Todo;
