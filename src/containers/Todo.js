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
    header: 'Задачи',
    todoItem: createString(3),
  };

  consoleClick = () => {
    console.log();
    const t = { ...this.state };
    console.log(t);
  };

  onClickTodo(item) {
    console.log(item);
  }

  onChangeInput = (event, id) => {};

  onKeyEnter = (event, id) => {
    if (event.key === 'Enter' && event.target.value) {
      const todoItem = [...this.state.todoItem];
      todoItem.push({
        id: id + 1,
        text: event.target.value,
        done: false,
      });

      this.setState({
        todoItem,
      });
      event.target.value = '';
    }
  };

  onClickDeleteHandler = (id) => {
    const todoItem = [...this.state.todoItem];
    const newTodoItem = todoItem.filter((item) => item.id !== id);

    this.setState({
      todoItem: newTodoItem,
    });
  };

  render() {
    return (
      <div>
        <Todolist
          todoItem={this.state.todoItem}
          header={this.state.header}
          onClickTodo={this.onClickTodo}
          onChangeInput={this.onChangeInput}
          onKeyEnter={this.onKeyEnter}
          onClickDelete={this.onClickDeleteHandler}
        />
        <div onClick={this.consoleClick}>Консоль</div>
      </div>
    );
  }
}

export default Todo;
