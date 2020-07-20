import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Todo from '../components/Todo';
import { setID } from '../functions/functions';
import Alert from '../components/Alert';

// import Context from './context';

export class Main extends Component {
  state = {
    alert: {
      text: '',
      positonLeft: '',
      positionTop: '',
      show: false,
    },
    todoCategory: [
      { level: 1, name: 'День' },
      { level: 2, name: 'Неделя' },
      { level: 3, name: 'Месяц' },
    ],
    todos: [
      {
        colorId: 3,
        done: false,
        id: 'P1594362794131',
        // idTodo: 'P1594362794131',
        parentId: 'P1594362794131',
        tasksIsOpen: true,
        text: 'eqfwe',
        todoLevel: 3,
      },
      {
        colorId: 3,
        done: false,
        id: 'M1594362796586',
        idTodo: 'P1594362794131',
        parentId: 'P1594362794131',
        tasksIsOpen: true,
        text: 'asdf',
        todoLevel: 2,
      },
      {
        colorId: 3,
        done: false,
        id: 'P1594362797202',
        idTodo: 'P1594362794131',
        parentId: 'P1594362794131',
        tasksIsOpen: true,
        text: 'wqer',
        todoLevel: 2,
      },
      {
        colorId: 3,
        done: false,
        id: 'O1594362805089',
        idTodo: 'P1594362797202',
        parentId: 'P1594362794131',
        tasksIsOpen: false,
        text: 'saf',
        todoLevel: 1,
      },
      {
        colorId: 3,
        done: false,
        id: 'A1594362805565',
        idTodo: 'P1594362797202',
        parentId: 'P1594362794131',
        tasksIsOpen: false,
        text: 'k',
        todoLevel: 1,
      },
      {
        colorId: 3,
        done: false,
        id: 'H1594362801513',
        idTodo: 'M1594362796586',
        parentId: 'P1594362794131',
        tasksIsOpen: false,
        text: 'trju',
        todoLevel: 1,
      },
      {
        colorId: 3,
        done: false,
        id: 'J1594362802038',
        idTodo: 'M1594362796586',
        parentId: 'P1594362794131',
        tasksIsOpen: false,
        text: 'po;p',
        todoLevel: 1,
      },
    ],
    tasks: [
      {
        id: 'M1594362796586',
        idTodo: 'P1594362794131',
        parentId: 'P1594362794131',
        text: 'asdf',
        done: false,
        todoLevel: 1,
      },
      {
        id: 'P1594362797202',
        idTodo: 'P1594362794131',
        parentId: 'P1594362794131',
        text: 'wqer',
        done: false,
        todoLevel: 1,
      },
      {
        id: 'H1594362801513',
        idTodo: 'M1594362796586',
        parentId: 'P1594362794131',
        text: 'trju',
        done: false,
        todoLevel: 2,
      },
      {
        id: 'J1594362802038',
        idTodo: 'M1594362796586',
        parentId: 'P1594362794131',
        text: 'po;p',
        done: false,
        todoLevel: 2,
      },
      {
        id: 'O1594362805089',
        idTodo: 'P1594362797202',
        parentId: 'P1594362794131',
        text: 'saf',
        done: false,
        todoLevel: 2,
      },
      {
        id: 'A1594362805565',
        idTodo: 'P1594362797202',
        parentId: 'P1594362794131',
        text: 'k',
        done: false,
        todoLevel: 2,
      },
    ],

    notes: [],
    colors: [
      { id: 1, hex: '#81C784', name: 'green', onUse: false },
      { id: 2, hex: '#FF8A65', name: 'orange', onUse: false },
      { id: 3, hex: '#c5cae9', name: 'indigo', onUse: true },
      { id: 4, hex: '#e1bee7', name: 'purple', onUse: true },
      { id: 5, hex: '#baddf9', name: 'blue', onUse: true },
      { id: 6, hex: '#ffcdd2', name: 'red', onUse: true },
      { id: 7, hex: '#fff9c4', name: 'yellow', onUse: true },
    ],
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://planning-9eeda.firebaseio.com/main/todos.json'
      );
      const todos = [];

      Object.keys(response.data).forEach((key) => {
        // todos.push({ ...response.data[key], id: key});
        todos.push({ ...response.data[key], key });
      });

      this.setState({ todos });
    } catch (e) {
      console.log(e);
    }
  }

  onClickTodo = () => {
    // console.log(this.state.todos);
    // console.log(this.state.tasks);
  };

  addTodo = async (event, todoLevel, colorId) => {
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
      const notes = [...this.state.notes];

      const id = setID();

      if (todoLevel === 1) {
        const noteObj = { id: setID(), idTodo: id, text: '' }
        notes.push(noteObj);

        try {
          await axios.post('https://planning-9eeda.firebaseio.com/main/notes.json', noteObj);
          this.setState({ notes });
          event.target.value = '';
        } catch (e) {
          console.log(e);
        }
      }

      const obj = {
        id: id,
        parentId: id,
        todoLevel,
        text: event.target.value || 'empty',
        done: false,
        tasksIsOpen: false,
        colorId,
      };

      todos.push(obj);

      // todos.push({
      //   id: id,
      //   // parentId: id,
      //   todoLevel,
      //   text: event.target.value || 'empty',
      //   done: false,
      //   tasksIsOpen: false,
      //   colorId,
      // });

      // event.target.value = '';

      alert.show = false;

      try {
        await axios.post('https://planning-9eeda.firebaseio.com/main/todos.json', obj);
        this.setState({ todos });
      } catch (e) {
        console.log(e);
      }

      this.setState({ alert });
    }
  };

  deleteTodoHandler = async (id, key) => {
    let todos = [...this.state.todos];
    let tasks = [...this.state.tasks];

    const currentTodo = todos.find((todo) => todo.id === id);
    const parentId = currentTodo.parentId;
    const todoLevel = currentTodo.todoLevel;

    if (todoLevel === 3) {
      todos = todos.filter((todo) => todo.parentId !== parentId);
      try {
        const res = await axios.post(
          `https://planning-9eeda.firebaseio.com/main/todos.json`,
          // {...todos}
          {...todos}
        );
        console.log(res);
        this.setState({ todos });
      } catch (e) {
        console.error(e);
      }
    }

    todos = todos.filter((todo) => todo.id !== id);

    try {
      await axios.delete(`https://planning-9eeda.firebaseio.com/main/todos/${key}.json`);
      this.setState({ todos });
    } catch (e) {
      console.error(e);
    }

    tasks = tasks.filter((task) => task.idTodo !== id);

    this.setState({
      tasks,
    });
  };

  deleteTaskHandler = (id) => {
    let tasks = [...this.state.tasks];

    tasks = tasks.filter((item) => item.id !== id);

    this.setState({
      tasks,
    });
  };

  checkHandler = (id, parentId, idTodo, todoLevel) => {
    const todos = [...this.state.todos];
    const tasks = [...this.state.tasks];

    let todoCheck;

    todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        todoCheck = todo.done;
      }
    });

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

    this.setState({
      todos,
      tasks,
    });
  };

  openTasksHandler = (id) => {
    const todos = [...this.state.todos];

    this.setState(
      todos.map((todo) => todo.id === id && (todo.tasksIsOpen = !todo.tasksIsOpen))
    );
  };

  addTask = (event, idTodo, parentId) => {
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

      alert.show = false;

      this.setState({
        tasks,
        alert,
      });
      event.target.value = '';
    }
  };

  decomposeTodoHandler = (event, task) => {
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

    this.setState({
      todos,
      notes,
      alert,
    });
  };

  noteInputHandler = (event, id) => {
    const notes = [...this.state.notes];

    notes.map((note) => {
      if (note.idTodo === id) {
        note.text = event.target.value;
      }
    });

    this.setState({
      notes,
    });
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
