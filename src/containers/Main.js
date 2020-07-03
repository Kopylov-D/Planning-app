import React, { Component } from 'react';
import Todo from './Todo';
// import Context from './context';

function ID() {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

export class Main extends Component {
  state = {
    todoCategory: ['День', 'Неделя', 'Месяц'],
    todos: [
      {
        id: 0,
        idCategory: 'День',
        text: `Задача 1`,
        done: false,
        subtasksIsOpen: true,
      },
      {
        id: 1,
        idCategory: 'Неделя',
        text: `Задача 2`,
        done: false,
        subtasksIsOpen: false,
      },
      {
        id: 2,
        idCategory: 'Неделя',
        text: `Задача 3`,
        done: false,
        subtasksIsOpen: false,
      },
      {
        id: 3,
        idCategory: 'Месяц',
        text: `Задача 4`,
        done: false,
        subtasksIsOpen: false,
      },
    ],
    subtasks: [
      { id: 230, idTodo: 0, text: `Задача 1/1`, done: false },
      { id: 123, idTodo: 0, text: `Задача 1/2`, done: false },
      { id: 2434, idTodo: 1, text: `Задача 1/3`, done: false },
      { id: 34545, idTodo: 2, text: `Задача 1/4`, done: false },
      { id: 5656654, idTodo: 2, text: `Задача 1/5`, done: true },
    ],
  };

  onClickTodo = () => {};

  onKeyEnter = (event, idCategory) => {
    if (event.key === 'Enter' && event.target.value) {
      const todos = [...this.state.todos];

      todos.push({
        id: ID(),
        idCategory,
        text: event.target.value,
        done: false,
        subtasksIsOpen: false,
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

  onClickDeleteSubtaskHandler = (id) => {
    let subtasks = [...this.state.subtasks];

    subtasks = subtasks.filter((subtask) => subtask.id !== id);

    this.setState({
      subtasks,
    });
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

  onKeyEnterSubtaskHandler = (event, idTodo) => {
    if (event.key === 'Enter' && event.target.value) {
      const subtasks = [...this.state.subtasks];

      subtasks.push({
        id: ID(),
        idTodo,
        text: event.target.value,
        done: false,
      });

      this.setState({
        subtasks,
      });
      event.target.value = '';
    }
  };

  onClickDecomposeOnTodoHandler = (event, subtask) => {
    const todos = [...this.state.todos];
    const todoCategory = [...this.state.todoCategory];

    const todo = todos.filter((todo) => todo.id === subtask.idTodo);
    const index = todoCategory.indexOf(todo[0].idCategory);

    

    todos.push({
      id: subtask.id,
      idCategory: todoCategory[index - 1],
      text: subtask.text,
      done: false,
      subtasksIsOpen: false,
    });

    this.setState({
      todos,
    });

    // this.onClickDeleteSubtaskHandler(subtask.id);
  };

  render() {
    return (
      <div className="main">
        <Todo
          todoName={this.state.todoCategory[0]}
          todos={this.state.todos}
          subtasks={this.state.subtasks}
          onClickTodo={this.onClickTodo}
          onChangeInput={this.onChangeInput}
          onKeyEnter={this.onKeyEnter}
          onClickDelete={this.onClickDeleteHandler}
          onClickDeleteSubtask={this.onClickDeleteSubtaskHandler}
          onChecked={this.onCheckedHandler}
          onClickSubtaskOpen={this.onClickSubtaskOpenHandler}
          onKeyEnterSubtask={this.onKeyEnterSubtaskHandler}
          onClickDecomposeOnTodo={this.onClickDecomposeOnTodoHandler}
        />
        <Todo
          todoName={this.state.todoCategory[1]}
          todos={this.state.todos}
          subtasks={this.state.subtasks}
          onClickTodo={this.onClickTodo}
          onChangeInput={this.onChangeInput}
          onKeyEnter={this.onKeyEnter}
          onClickDelete={this.onClickDeleteHandler}
          onClickDeleteSubtask={this.onClickDeleteSubtaskHandler}
          onChecked={this.onCheckedHandler}
          onClickSubtaskOpen={this.onClickSubtaskOpenHandler}
          onKeyEnterSubtask={this.onKeyEnterSubtaskHandler}
          onClickDecomposeOnTodo={this.onClickDecomposeOnTodoHandler}
        />
        <Todo
          todoName={this.state.todoCategory[2]}
          todos={this.state.todos}
          subtasks={this.state.subtasks}
          onClickTodo={this.onClickTodo}
          onChangeInput={this.onChangeInput}
          onKeyEnter={this.onKeyEnter}
          onClickDelete={this.onClickDeleteHandler}
          onClickDeleteSubtask={this.onClickDeleteSubtaskHandler}
          onChecked={this.onCheckedHandler}
          onClickSubtaskOpen={this.onClickSubtaskOpenHandler}
          onKeyEnterSubtask={this.onKeyEnterSubtaskHandler}
          onClickDecomposeOnTodo={this.onClickDecomposeOnTodoHandler}
        />
      </div>
    );
  }
}

export default Main;
