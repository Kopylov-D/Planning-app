import React, { Component, Fragment } from 'react';
import Todo from '../components/Todo';
import { setID, Observer, Subject } from '../functions/functions';
import Alert from '../components/Alert';
// import Context from './context';

export class Main extends Component {
  state = {
    alert: { text: 'Данное значение уже добавленно!', show: false },
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
      },
      {
        id: 'P1594362797202',
        idTodo: 'P1594362794131',
        parentId: 'P1594362794131',
        text: 'wqer',
        done: false,
      },
      {
        id: 'H1594362801513',
        idTodo: 'M1594362796586',
        parentId: 'P1594362794131',
        text: 'trju',
        done: false,
      },
      {
        id: 'J1594362802038',
        idTodo: 'M1594362796586',
        parentId: 'P1594362794131',
        text: 'po;p',
        done: false,
      },
      {
        id: 'O1594362805089',
        idTodo: 'P1594362797202',
        parentId: 'P1594362794131',
        text: 'saf',
        done: false,
      },
      {
        id: 'A1594362805565',
        idTodo: 'P1594362797202',
        parentId: 'P1594362794131',
        text: 'k',
        done: false,
      },
    ],

    notes: [],
    colors: [
      { id: 1, hex: '#81C784', name: 'green' },
      { id: 2, hex: '#FF8A65', name: 'orange' },
      { id: 3, hex: '#c5cae9', name: 'indigo' },
    ],
    observers: [],
    subjects: [],
  };

  onClickTodo = () => {
    // console.log(this.state.todos);
    // console.log(this.state.tasks);
  };

  addTodo = (event, todoLevel, colorId) => {
    if (event.key === 'Enter' && event.target.value) {
      const todos = [...this.state.todos];
      const notes = [...this.state.notes];

      const id = setID();

      if (todoLevel === 1) {
        notes.push({ id: setID(), idTodo: id, text: '' });
      }

      const subjects = [...this.state.subjects];
      subjects.push({
        id,
        sub: new Subject(),
      });
      // const stream$ = new Subject()

      todos.push({
        id: id,
        parentId: id,
        // idTodo: id,
        todoLevel,
        text: event.target.value,
        done: false,
        tasksIsOpen: false,
        colorId,
      });

      this.setState({
        todos,
        notes,
        subjects,
      });
      event.target.value = '';
    }
  };

  deleteTodoHandler = (id) => {
    let todos = [...this.state.todos];
    let tasks = [...this.state.tasks];

    todos = todos.filter((item) => item.id !== id);
    tasks = tasks.filter((item) => item.idTodo !== id);

    this.setState({
      todos,
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

    function searchRelatives() {
      // switch (todoLevel) {
      //   case 3:
      //     searchChilds();
      //     break
      //   case 2:
      //     searchParents();
      //     searchChilds();
      //   case 1:
      //     searchParents();
      //   default:
      //     return;
      // }

      const todo = todos.find((todo) => todo.id === id);

      if (todo.idTodo) {
        searchParents();
        searchChilds();
      }
      if (!todo.idTodo) {
        searchChilds();
      }
    }

    function searchChilds() {
      let arr = [];
      if (todoLevel > 1) {
        todos.map((todo) => {
          if (todo.id === id) {
            todo.done = todoCheck;
            tasks.map((task) => {
              if (task.idTodo === id) {
                task.done = todoCheck;
                arr.push(task.id);
              }
            });
          }
        });
        console.log(arr);
      }
      // tasks.map((task) => {
      //   if (task.parentId === parentId) {
      //     task.done = todoCheck;
      //   }
      // });
    }

    function searchParents() {
      tasks.map((task) => (task.id === id ? (task.done = todoCheck) : null));
      const filteredTasks = tasks.filter(
        (task) => task.idTodo === idTodo && task.done === todoCheck
      );

      if (!filteredTasks.length) {
        todos.map((todo) => {
          if (todo.id === idTodo) {
            todo.done = true;
          }
        });
        id = idTodo;
        idTodo = todos.find((todo) => todo.id === id).idTodo;
        if (idTodo) {
          searchParents();
        }
      } else {
        todos.map((todo) => {
          if (todo.id === idTodo) {
            todo.done = false;
          }
        });
      }
    }

    searchRelatives();

    this.setState({
      todos,
      tasks,
    });
  };

  checkHandler1 = (id, parentId, idTodo, todoLevel) => {
    const todos = [...this.state.todos];
    const tasks = [...this.state.tasks];

    let todoCheck;

    todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        todoCheck = todo.done;
      }
    });

    function check(arr) {
      arr.map((item) => {
        if ((item.idTodo === id || item.id === id) && item.done !== todoCheck) {
          item.done = todoCheck;
          check(arr);
        }
      });
    }

    check(tasks);
    check(todos);

    function checkAllTask(arr1, arr2) {
      const filtered = arr1.filter(
        (item) => item.idTodo === idTodo && item.done === false
      );

      if (!filtered.length) {
        arr2.map((todo) => {
          if (todo.id === idTodo) {
            todo.done = true;
          }
        });
      } else {
        arr2.map((todo) => {
          if (todo.id === idTodo) {
            todo.done = false;
          }
        });
      }
    }

    checkAllTask(tasks, todos);

    function findRelatives(arr1, arr2) {
      const parentTodo = todos.find(
        (todo) =>
          todo.parentId === parentId && todo.todoLevel === 3 && id === todo.id
      );
      if (parentTodo) {
        arr1.map((item) =>
          item.parentId === parentId ? (item.done = parentTodo.done) : null
        );
        arr2.map((item) =>
          item.parentId === parentId ? (item.done = parentTodo.done) : null
        );
        checkAllTask(tasks, todos);
      } else if (
        todos.find(
          (todo) =>
            todo.parentId === parentId && todo.todoLevel === 1 && id === todo.id
        )
      ) {
        id = parentId;
        const newTodo = arr1.find((item) => item.id === id);
        parentId = newTodo.parentId;
        checkAllTask(arr1, arr2);
      }
    }

    findRelatives(todos, tasks);

    this.setState({
      todos,
    });
  };

  openTasksHandler = (id) => {
    const todos = [...this.state.todos];

    this.setState(
      todos.map(
        (todo) => todo.id === id && (todo.tasksIsOpen = !todo.tasksIsOpen)
      )
    );
  };

  addTask = (event, idTodo, parentId) => {
    if (event.key === 'Enter' && event.target.value) {
      const todos = [...this.state.todos];
      const tasks = [...this.state.tasks];
      const subjects = [...this.state.subjects];

      // subjects.map(subject => {
      //   if (subject.id === idTodo) {
      //     subject.sub.subscribe(new Observer())
      //   }
      // })

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

      this.setState({
        tasks,
        subjects,
      });
      event.target.value = '';

      console.log(this.state);
    }
  };

  decomposeTodoHandler = (task) => {
    const todos = [...this.state.todos];
    const notes = [...this.state.notes];

    const todo = todos.find((todo) => todo.id === task.idTodo);
    const todoLevel = todo.todoLevel - 1;

    if (todos.find((todo) => todo.id === task.id)) {
      const alert = { ...this.state.alert };
      alert.show = true;
      this.setState({ alert });
      return;
      
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

  render() {
    return (
      <Fragment>
        <Alert alert={this.state.alert} />
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
