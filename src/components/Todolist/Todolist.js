import React, { Fragment } from 'react';
import TodoItem from './TodoItem/TodoItem';

const Todolist = (props) => {
  return (
    <div className="todolist">
      <h2>{props.todoName}</h2>
      <ul className="list-group">
        {props.todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              subtasksIsOpen={todo.subtasksIsOpen}
              subtasks={props.subtasks}
              onClickTodo={props.onClickTodo}
              onClickDelete={props.onClickDelete}
              onClickDeleteSubtask={props.onClickDeleteSubtask}
              onChecked={props.onChecked}
              onClickSubtaskOpen={props.onClickSubtaskOpen}
            />
          );
        })}
      </ul>
      <Fragment>
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">
              +
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Введите задачу"
            onChange={props.onChangeInput}
            onKeyDown={(event) => props.onKeyEnter(event, props.todos.length)}
          />
        </div>
      </Fragment>
    </div>
  );
};

export default Todolist;
