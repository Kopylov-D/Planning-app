import React from 'react';
import TodoItem from './TodoItem';

const Todo = (props) => {
  return (
    <div className="todolist">
      <h5>{props.todoName}</h5>
      <ul className="list-group">
        {props.todos.map((todo, index) => {
          if (todo.idCategory === props.todoName) {
            return (
              <TodoItem
                key={index}
                todo={todo}
                todoName={props.todoName}
                subtasksIsOpen={todo.subtasksIsOpen}
                subtasks={props.todos}
                notes={props.notes}
                onClickTodo={props.onClickTodo}
                onClickDelete={props.onClickDelete}
                onInputSubtask={props.onInputSubtask}
                onChecked={props.onChecked}
                onClickSubtaskOpen={props.onClickSubtaskOpen}
                onClickDecomposeTodo={props.onClickDecomposeTodo}
                onChangeNotes={props.onChangeNotes}
              />
            );
          }
        })}
      </ul>
      <div className="input-group flex-nowrap">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">
            +
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Новая задача"
          onChange={props.onChangeInput}
          onKeyDown={(event) =>
            props.onInputTodo(
              event,
              props.todoName,
              props.idTodo,
              props.idDecompose
            )
          }
        />
      </div>
    </div>
  );
};

export default Todo;
