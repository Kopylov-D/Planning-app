import React, { Component } from 'react';
import Todo from '../components/Todo';
import { setID, Observer, Subject } from '../functions/functions';
// import Context from './context';

export class Main extends Component {
  state = {
    todoCategory: [
      { level: 1, name: 'День' },
      { level: 2, name: 'Неделя' },
      { level: 3, name: 'Месяц' },
    ],
    todos: [
      {
        id: 0,
        categoryLevel: 1,
        text: 'Задача 1',
        done: false,
        tasksIsOpen: false,
        colorId: 1,
      },
      {
        id: 1,
        categoryLevel: 2,
        text: 'Задача 2',
        done: false,
        tasksIsOpen: true,
        colorId: 2,
      },
      {
        id: 3,
        categoryLevel: 2,
        text: 'Задача 3',
        done: false,
        tasksIsOpen: true,
        colorId: 3,
      },
      {
        id: 4,
        categoryLevel: 3,
        text: 'Задача 4',
        done: false,
        tasksIsOpen: true,
        colorId: 1,
      },
    ],
    tasks: [
      { id: 10, idTodo: 0, text: `Задача 1/1`, done: false },
      { id: 11, idTodo: 0, text: `Задача 1/2`, done: false },
      { id: 12, idTodo: 1, text: `Задача 1/3`, done: false },
      { id: 13, idTodo: 2, text: `Задача 1/4`, done: false },
      { id: 14, idTodo: 2, text: `Задача 1/5`, done: false },
      { id: 15, idTodo: 3, text: `Задача 1/5`, done: false },
    ],
    notes: [{ id: 12323, idTodo: 0, text: 'Заметки по задаче' }],
    colors: [
      { id: 1, hex: '#81C784', name: 'green' },
      { id: 2, hex: '#FF8A65', name: 'orange' },
      { id: 3, hex: '#c5cae9', name: 'indigo' },
    ],
    observers: [],
    subjects: [],
  };

  onClickTodo = () => {};

  addTodo = (event, categoryLevel, colorId) => {
    if (event.key === 'Enter' && event.target.value) {
      const todos = [...this.state.todos];
      const notes = [...this.state.notes];

      const id = setID();

      if (categoryLevel === 1) {
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
        categoryLevel,
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

  checkHandler = (id, parentId, idTodo) => {
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
          todo.parentId === parentId &&
          todo.categoryLevel === 3 &&
          id === todo.id
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
            todo.parentId === parentId &&
            todo.categoryLevel === 1 &&
            id === todo.id
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
    const categoryLevel = todo.categoryLevel - 1;

    if (todos.find((todo) => todo.id === task.id)) {
      return alert('Данное значение уже добавлено');
    } else {
      todos.push({
        id: task.id,
        parentId: task.parentId,
        categoryLevel,
        text: task.text,
        done: task.done,
        tasksIsOpen: false,
        idTodo: task.idTodo,
        colorId: todo.colorId,
      });

      if (categoryLevel === 1) {
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
      <div className="main">
        {this.state.todoCategory.map((category, index) => {
          return (
            <Todo
              key={index}
              todoLevel={category.level}
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
    );
  }
}

export default Main;
