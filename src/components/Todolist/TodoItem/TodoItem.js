import React, { Fragment } from 'react';
import SubTask from './SubTask';

const TodoItem = (props) => {
  const classes = [];

  if (props.todo.done) {
    classes.push('done');
  }

  return (
    <Fragment>
      <li
        className="list-group-item note"
        onClick={() => props.onClickTodo(props.todo.id)}
      >
        <div className={classes.join(' ')}>
          <input
            type="checkbox"
            checked={props.todo.done}
            className="checkBox"
            onChange={() => props.onChecked(props.todo.id)}
          ></input>
          {props.todo.text}
        </div>

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => props.onClickDelete(props.todo.id)}
        >
          &times;
        </button>
      </li>
      {props.subtasksIsOpen ?
       props.todo.map((todo, index) => {
        return (
          <TodoItem
            key={index}
            todo={todo}
            subtasksIsOpen={props.subtasksIsOpen}
            onClickTodo={props.onClickTodo}
            onClickDelete={props.onClickDelete}
            onChecked={props.onChecked}
          />
        );
      })
      : null}
    </Fragment>
  );
};

export default TodoItem;
// className="btn btn-danger col-sm-1 align-self-center"
