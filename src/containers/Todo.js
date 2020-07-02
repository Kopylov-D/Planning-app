import React from 'react';
import Todolist from '../components/Todolist/Todolist';

class Todo extends React.Component {
  state = {
    todoName: this.props.todoName,
    todos: [
      { id: 0, text: `Задача 1`, done: false, subtasksIsOpen: true },
      { id: 1, text: `Задача 2`, done: false, subtasksIsOpen: false },
      { id: 2, text: `Задача 3`, done: false, subtasksIsOpen: false },
    ],
    subtasks: [
      { id: 0, idTodo: 0, text: `Задача 1/1`, done: false },
      { id: 1, idTodo: 0, text: `Задача 1/2`, done: false },
      { id: 2, idTodo: 1, text: `Задача 1/3`, done: false },
      { id: 3, idTodo: 2, text: `Задача 1/4`, done: false },
      { id: 4, idTodo: 2, text: `Задача 1/5`, done: false },
    ],
  };

  consoleClick = (n) => {
    console.log(this.state);
    console.log(this.props);
  };

  onClickTodo(item) {}

  onChangeInput = (event, id) => {};

  onKeyEnter = (event, id) => {
    if (event.key === 'Enter' && event.target.value) {
      const todos = [...this.state.todos];

      todos.push({
        id: id + 1,
        text: event.target.value,
        done: false,
        subtasksIsOpen: true,
      });

      this.setState({
        todos,
      });
      event.target.value = '';
    }
  };

  onClickDeleteHandler = (id) => {
    let todos = [...this.state.todos];

    todos = todos.filter((item) => item.id !== id);

    this.setState({
      todos,
    });
  };

  onClickDeleteSubtaskHandler = (id, parentId) => {
    const todos = { ...this.state.todos };
  };

  onCheckedHandler = (id) => {
    const todos = [...this.state.todos];

    this.setState(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      })
    );
  };

  onClickSubtaskOpenHandler = (id) => {
    const todos = [...this.state.todos];

    this.setState(
      todos.map((todo) =>
        todo.id === id ? (todo.subtasksIsOpen = !todo.subtasksIsOpen) : null
      )
    );
  };

  render() {
    return (
      <div>
        <Todolist
          todos={this.state.todos}
          todoName={this.state.todoName}
          subtasks={this.state.subtasks}
          // subtasksIsOpen={this.state.todoItem.subtasksIsOpen}
          onClickTodo={this.onClickTodo}
          onChangeInput={this.onChangeInput}
          onKeyEnter={this.onKeyEnter}
          onClickDelete={this.onClickDeleteHandler}
          onClickDeleteSubtask={this.onClickDeleteSubtaskHandler}
          onChecked={this.onCheckedHandler}
          onClickSubtaskOpen={this.onClickSubtaskOpenHandler}
        />
        <div onClick={this.consoleClick}>Консоль</div>
      </div>
    );
  }
}

export default Todo;
