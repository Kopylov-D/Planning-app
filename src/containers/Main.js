import React, { Component } from 'react';
import Todo from '../components/Todo';
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
        isSubtask: false,
        idTodo: 0,
      },
      {
        id: 1,
        idCategory: 'День',
        text: `Задача 2`,
        done: false,
        subtasksIsOpen: true,
        isSubtask: true,
        idTodo: 0,
      },
      {
        id: 2,
        idCategory: 'День',
        text: `Задача 3`,
        done: false,
        subtasksIsOpen: false,
        isSubtask: true,
        idTodo: 3,
      },
      {
        id: 3,
        idCategory: 'День',
        text: `Задача 4`,
        done: false,
        subtasksIsOpen: true,
        isSubtask: false,
        idTodo: 0,
      },
      {
        id: 4,
        idCategory: 'День',
        text: `Задача 5`,
        done: false,
        subtasksIsOpen: false,
        isSubtask: true,
        idTodo: 0,
      },
      {
        id: 5,
        idCategory: 'День',
        text: `Задача 6`,
        done: false,
        subtasksIsOpen: false,
        isSubtask: true,
        idTodo: 3,
      },
    ],
    // subtasks: [
    //   { id: 230, idTodo: 0, text: `Задача 1/1`, done: false },
    //   { id: 123, idTodo: 0, text: `Задача 1/2`, done: false },
    //   { id: 2434, idTodo: 1, text: `Задача 1/3`, done: false },
    //   { id: 34545, idTodo: 2, text: `Задача 1/4`, done: false },
    //   { id: 5656654, idTodo: 2, text: `Задача 1/5`, done: false },
    //   { id: 56566542545, idTodo: 3, text: `Задача 1/5`, done: false },
    // ],
    notes: [{ id: 12323, idTodo: 0, text: 'Заметки по задаче' }],
  };

  onClickTodo = () => {};

  onInputTodoHandler = (event, idCategory) => {
    if (event.key === 'Enter' && event.target.value) {
      const todos = [...this.state.todos];
      const notes = [...this.state.notes];
      const id = ID();

      todos.push({
        id: id,
        idCategory,
        text: event.target.value,
        done: false,
        subtasksIsOpen: false,
        idTodo: id,
      });

      notes.push({ id: ID(), idTodo: id, text: '' });

      this.setState({
        todos,
        notes,
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

  // onCheckedHandler = (id) => {
  //   const todos = [...this.state.todos];
  //   const subtasks = [...this.state.subtasks];

  //   let todoCheck;
  //   // let idForSubtask = []
  //   // subtasks.forEach(subtask => {
  //   //   if (subtask.idTodo === id) {
  //   //     idForSubtask.push(subtask.id)
  //   //   }
  //   // })
  //   todos.map((todo) => {
  //     if (todo.id === id) {
  //       todo.done = !todo.done;
  //       todoCheck = todo.done; //запомнить значение для subtask текущего todo
  //     }
  //     if (todo.idCompose === id) {
  //       // console.log(todo.idCompose, id)
  //       // todo.done = todoCheck;
  //     }
  //     if (todo.idCompose) {
  //       console.log(todo.idCompose);
  //       todo.done = todoCheck;
  //     }
  //   });

  //   let parentId;
  //   subtasks.map((subtask) => {
  //     if (subtask.idTodo === id) {
  //       subtask.done = todoCheck;
  //     }
  //     if (subtask.id === id) {
  //       subtask.done = !subtask.done;
  //       parentId = subtask.idTodo;
  //     }
  //     if (subtask.id === todoCheck) {
  //     }
  //   });

  //   const filteredSubtasks = subtasks.filter(
  //     (subtask) => subtask.idTodo === parentId && !subtask.done
  //   );

  //   if (!filteredSubtasks.length) {
  //     todos.map((todo) => {
  //       if (todo.id === parentId) {
  //         todo.done = true;
  //       }
  //     });
  //   } else {
  //     todos.map((todo) => {
  //       if (todo.id === parentId) {
  //         todo.done = false;
  //       }
  //     });
  //   }

  //   this.setState({
  //     todos,
  //     subtasks,
  //   });
  // };

  onCheckedHandler = (id) => {
    const todos = [...this.state.todos];
    const subtasks = [...this.state.subtasks];

    let todoCheck;

    todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        return (todoCheck = todo.done);
      }
    });

    subtasks.map((subtask) => {
      if (subtask.idTodo === id || subtask.id === id) {
        subtask.done = todoCheck;
      }
    });

    todos.map((todo) => {
      if (id === todo.idTodo) {
        todo.done = todoCheck;
      }
    });
    // let idForSubtask = []
    // subtasks.forEach(subtask => {
    //   if (subtask.idTodo === id) {
    //     idForSubtask.push(subtask.id)
    //   }
    // })
    // todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.done = !todo.done;
    //     todoCheck = todo.done; //запомнить значение для subtask текущего todo
    //   }
    //   if (todo.idCompose === id) {
    //     // console.log(todo.idCompose, id)
    //     // todo.done = todoCheck;
    //   }
    //   if (todo.idCompose) {
    //     console.log(todo.idCompose);
    //     todo.done = todoCheck;
    //   }
    // });

    // let parentId;
    // subtasks.map((subtask) => {
    //   if (subtask.idTodo === id) {
    //     subtask.done = todoCheck;
    //   }
    //   if (subtask.id === id) {
    //     subtask.done = !subtask.done;
    //     parentId = subtask.idTodo;
    //   }
    //   if (subtask.id === todoCheck) {
    //   }
    // });

    const filtred = todos.forEach((todo) => {
      subtasks.forEach((subtask) => {
        if (subtask.idTodo === todo.id) {
          console.log('ID', todo.id);
        }
      });
    });

    // const filteredSubtasks = subtasks.filter(
    //   (subtask) => subtask.idTodo === id && subtask.done === false
    // );

    // console.log(filteredSubtasks)

    // if (!filteredSubtasks.length) {
    //   todos.map((todo) => {
    //     if (todo.id === id) {
    //       todo.done = true;
    //     }
    //   });
    // } else {
    //   todos.map((todo) => {
    //     if (todo.id === id) {
    //       todo.done = false;
    //     }
    //   });
    // }

    this.setState({
      todos,
      subtasks,
    });
  };

  onClickSubtaskOpenHandler = (id) => {
    const todos = [...this.state.todos];

    this.setState(
      todos.map((todo) =>
        todo.id === id ? (todo.subtasksIsOpen = !todo.subtasksIsOpen) : null
      )
    );
  };

  onInputSubtaskHandler = (event, idTodo, idCategory, todo) => {
    if (event.key === 'Enter' && event.target.value) {
      // const subtasks = [...this.state.subtasks];
      const todos = [...this.state.todos];
      // let newIdTodo = null
      console.log(todo);
      todos.map((todo) => {
        if (todo.id === idTodo) {
          todo.done = false;
        }
      });

      console.log(idTodo, idCategory);

      todos.push({
        id: ID(),
        idCategory,
        text: event.target.value,
        done: false,
        subtasksIsOpen: false,
        isSubtask: true,
        idTodo,

        // idDecompose: idTodo
      });

      this.setState({
        todos,
      });
      event.target.value = '';
    }
  };

  onClickDecomposeOnTodoHandler = (subtask) => {
    const todos = [...this.state.todos];
    const todoCategory = [...this.state.todoCategory];
    const notes = [...this.state.notes];

    const todo = todos.filter((todo) => todo.id === subtask.idTodo);
    const index = todoCategory.indexOf(todo[0].idCategory);

    if (todos.find((todo) => todo.id === subtask.id)) {
      alert('Данное значение уже добавлено');
      return;
    } else {
      todos.push({
        id: subtask.id,
        idCategory: todoCategory[index - 1],
        text: subtask.text,
        done: subtask.done,
        subtasksIsOpen: false,
        idTodo: subtask.idTodo,
      });
      notes.push({ id: ID(), idTodo: subtask.id, text: '' });
    }

    this.setState({
      todos,
      notes,
    });

    // this.onClickDeleteSubtaskHandler(subtask.id);
  };

  onChangeNotesHandler = (event, id) => {
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
        <Todo
          todoName={this.state.todoCategory[0]}
          todos={this.state.todos}
          // subtasks={this.state.subtasks}
          notes={this.state.notes}
          onClickTodo={this.onClickTodo}
          onChangeInput={this.onChangeInput}
          onInputTodo={this.onInputTodoHandler}
          onClickDelete={this.onClickDeleteHandler}
          // onClickDeleteSubtask={this.onClickDeleteSubtaskHandler}
          onChecked={this.onCheckedHandler}
          onClickSubtaskOpen={this.onClickSubtaskOpenHandler}
          onInputSubtask={this.onInputSubtaskHandler}
          onClickDecomposeOnTodo={this.onClickDecomposeOnTodoHandler}
          onChangeNotes={this.onChangeNotesHandler}
        />
        {/* <Todo
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
        /> */}
      </div>
    );
  }
}

export default Main;
