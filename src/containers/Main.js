import React, { Component, Fragment } from 'react';
import axios from '../axios/axios';

import Todo from '../components/Todo';
import Alert from '../components/Alert';
import { setID } from '../utils/utils';

export class Main extends Component {
  state = {
    alert: {
      text: '',
      positonLeft: '',
      positionTop: '',
      show: false,
    },
    disabledInput: false,
    todoCategory: [
      { level: 1, name: 'День' },
      { level: 2, name: 'Неделя' },
      { level: 3, name: 'Месяц' },
    ],
    todos: [],
    tasks: [],
    notes: [],
    colors: [
      { id: 1, name: 'green' },
      { id: 2, name: 'orange' },
      { id: 3, name: 'indigo' },
      { id: 4, name: 'purple' },
      { id: 5, name: 'blue' },
      { id: 6, name: 'red' },
      { id: 7, name: 'yellow' },
    ],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/main.json');

      if (response.data) {
        this.setState(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  onClickTodo = () => {};

  addTodo = async (event, todoLevel, colorId) => {
    if (event.key === 'Enter' && event.target.value && !this.state.disabledInput) {
      const alert = { ...this.state.alert };

      if (event.target.value.length > 30) {
        alert.positionLeft = event.target.getBoundingClientRect().x;
        alert.positionTop = event.target.getBoundingClientRect().bottom;

        alert.show = true;
        alert.type = 'danger';
        alert.text = 'Длина задачи должна быть менее 30 символов!';

        this.setState({ alert });
        return;
      }

      this.setState({ disabledInput: true });
      const todos = [...this.state.todos];
      const notes = [...this.state.notes];

      const id = setID();

      if (todoLevel === 1) {
        const noteObj = { id: setID(), idTodo: id, text: '' };
        notes.push(noteObj);
      }

      const obj = {
        id,
        parentId: id,
        todoLevel,
        text: event.target.value,
        done: false,
        tasksIsOpen: false,
        colorId,
      };

      todos.push(obj);

      event.target.value = '';
      alert.show = false;

      try {
        await axios.put('/main/todos.json', todos);
        this.setState({ todos });
      } catch (e) {
        console.error(e);
      }

      try {
        await axios.put('/main/notes.json', notes);
        this.setState({ notes, disabledInput: false });
      } catch (e) {
        console.error(e);
      }

      this.setState({ alert });
    }
  };

  deleteTodoHandler = async (id) => {
    let todos = [...this.state.todos];
    let tasks = [...this.state.tasks];

    const currentTodo = todos.find((todo) => todo.id === id);
    const parentId = currentTodo.parentId;
    const todoLevel = currentTodo.todoLevel;

    if (todoLevel === 3) {
      todos = todos.filter((todo) => todo.parentId !== parentId);

      try {
        await axios.put(`/main/todos.json`, todos);

        this.setState({ todos });
      } catch (e) {
        console.error(e);
      }
    }

    todos = todos.filter((todo) => todo.id !== id);
    tasks = tasks.filter((task) => task.idTodo !== id);

    try {
      await axios.put(`/main/todos.json`, todos);
      this.setState({ todos });
    } catch (e) {
      console.error(e);
    }

    try {
      await axios.put(`/main/tasks.json`, tasks);
      this.setState({ tasks });
    } catch (e) {
      console.error(e);
    }
  };

  deleteTaskHandler = async (id) => {
    let tasks = [...this.state.tasks];

    tasks = tasks.filter((item) => item.id !== id);

    try {
      await axios.put(`/main/tasks.json`, tasks);
      this.setState({ tasks });
    } catch (e) {
      console.error(e);
    }
  };

  checkHandler = async (id, parentId, idTodo, todoLevel) => {
    const todos = [...this.state.todos];
    const tasks = [...this.state.tasks];

    let todoCheck;

    todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        todoCheck = todo.done;
      }
    });

    if (!idTodo) {
      try {
        await axios.put(`/main/todos.json`, todos);
        this.setState({ todos });
        return;
      } catch (e) {
        console.error(e);
      }
    }

    function findChildTask() {
      let filtered = tasks.filter(
        (task) => task.idTodo === idTodo && task.done === false
      );

      if (!filtered.length) {
        todos.map((todo) => {
          if (todo.id === idTodo) {
            todo.done = true;
          }
        });
      } else {
        todos.map((todo) => {
          if (todo.id === idTodo) {
            todo.done = false;
          }
        });
      }
    }

    if (todoLevel === 1) {
      let task = tasks.find((task) => task.id === id);
      tasks.map((task) => (task.id === id ? (task.done = todoCheck) : null));
      idTodo = task.idTodo;

      findChildTask();

      let todo = todos.find((todo) => todo.id === idTodo);
      id = todo.id;
      idTodo = todo.idTodo;
      todoCheck = todo.done;

      tasks.map((task) => (task.id === id ? (task.done = todoCheck) : null));

      findChildTask();
    }

    if (todoLevel === 2) {
      tasks.map((task) => {
        if (task.idTodo === id) {
          task.done = todoCheck;
          todos.map((todo) => {
            if (todo.id === task.id) {
              todo.done = todoCheck;
            }
          });
        }
      });

      tasks.map((task) => (task.id === id ? (task.done = todoCheck) : null));
      todos.map((todo) => (todo.id === idTodo ? (todo.done = todoCheck) : null));

      findChildTask();
    }

    if (todoLevel === 3) {
      todos.map((todo) => (todo.parentId === parentId ? (todo.done = todoCheck) : null));
      tasks.map((task) => (task.parentId === parentId ? (task.done = todoCheck) : null));
    }

    try {
      await axios.put(`/main/todos.json`, todos);
      this.setState({ todos });
    } catch (e) {
      console.error(e);
    }

    try {
      await axios.put(`/main/tasks.json`, tasks);
      this.setState({ tasks });
    } catch (e) {
      console.error(e);
    }
  };

  openTasksHandler = async (id) => {
    const todos = [...this.state.todos];
    if (todos.find((t) => t.id === id).todoLevel === 1) {
      const notes = [...this.state.notes];

      try {
        await axios.put('/main/notes.json', notes);
        this.setState({ notes });
      } catch (e) {
        console.error(e);
      }
    }

    this.setState(
      todos.map((todo) => todo.id === id && (todo.tasksIsOpen = !todo.tasksIsOpen))
    );
  };

  addTask = async (event, idTodo, parentId) => {
    if (event.key === 'Enter' && event.target.value) {
      const alert = { ...this.state.alert };

      if (event.target.value.length > 30) {
        alert.positionLeft = event.target.getBoundingClientRect().x;
        alert.positionTop = event.target.getBoundingClientRect().bottom;

        alert.show = true;
        alert.type = 'danger';
        alert.text = 'Длина задачи должна быть менее 30 символов!';

        this.setState({ alert });
        return;
      }
      const todos = [...this.state.todos];
      const tasks = [...this.state.tasks];

      todos.map((todo) => {
        if (todo.id === idTodo) {
          todo.done = false;
        }
      });

      tasks.push({
        id: setID(),
        idTodo,
        parentId,
        text: event.target.value,
        done: false,
      });

      event.target.value = '';
      alert.show = false;

      try {
        await axios.put(`/main/tasks.json`, tasks);
        this.setState({ tasks });
      } catch (e) {
        console.error(e);
      }

      this.setState({
        alert,
      });
    }
  };

  decomposeTodoHandler = async (event, task) => {
    const todos = [...this.state.todos];
    const notes = [...this.state.notes];
    const alert = { ...this.state.alert };

    const todo = todos.find((todo) => todo.id === task.idTodo);
    const todoLevel = todo.todoLevel - 1;

    if (todos.find((todo) => todo.id === task.id)) {
      alert.positionLeft = event.pageX;
      alert.positionTop = event.pageY;
      alert.type = 'warning';
      alert.text = 'Задача уже добавлена!';

      alert.show = true;
      this.setState({ alert });
    } else {
      todos.push({
        id: task.id,
        parentId: task.parentId,
        todoLevel,
        text: task.text,
        done: task.done,
        tasksIsOpen: false,
        idTodo: task.idTodo,
        colorId: todo.colorId,
      });

      if (todoLevel === 1) {
        notes.push({ id: setID(), idTodo: task.id, text: '' });
      }
    }

    try {
      await axios.put(`/main/todos.json`, todos);
      this.setState({ todos });
    } catch (e) {
      console.error(e);
    }

    try {
      await axios.put(`/main/notes.json`, notes);
      this.setState({ notes });
    } catch (e) {
      console.error(e);
    }
  };

  noteInputHandler = async (event, id) => {
    const notes = [...this.state.notes];

    notes.map((note) => {
      if (note.idTodo === id) {
        note.text = event.target.value;
      }
    });

    this.setState({ notes });
  };

  closeAlertHandler = () => {
    const alert = { ...this.state.alert };
    alert.show = false;
    this.setState({ alert });
  };

  render() {
    return (
      <Fragment>
        <Alert alert={this.state.alert} closeAlert={this.closeAlertHandler} />
        <div className="main">
          {this.state.todoCategory.map((category, index) => {
            return (
              <Todo
                key={index}
                todoLevel={category.level}
                todoName={category.name}
                todos={this.state.todos}
                tasks={this.state.tasks}
                notes={this.state.notes}
                colors={this.state.colors}
                onClickTodo={this.onClickTodo}
                addTodo={this.addTodo}
                deleteTodo={this.deleteTodoHandler}
                deleteTask={this.deleteTaskHandler}
                onChecked={this.checkHandler}
                openTasks={this.openTasksHandler}
                addTask={this.addTask}
                decomposeTodo={this.decomposeTodoHandler}
                noteInput={this.noteInputHandler}
              />
            );
          })}
        </div>
      </Fragment>
    );
  }
}

export default Main;
