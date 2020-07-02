import React, { Fragment } from 'react';
import SubTask from './SubTask';

const TodoItem = (props) => {
  const classes = [];
 
  if (props.todo.done) {
    classes.push('done');
  }

  if (props.className) {
    classes.push(props.className);
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

        <div class="btn-group dropright">
          <button
            type="button"
            class="btn btn-secondary btn-sm  dropdown-toggle"
            onClick={() => props.onClickSubtaskOpen(props.todo.id)}
          ></button>
        </div>

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => props.onClickDelete(props.todo.id)}
        >
          &times;
        </button>
      </li>

      {props.subtasksIsOpen ? (
        <ul className="list-group">
          {props.subtasks.map((task, index) => {
            return (
              <SubTask key={index} subtask={task} todoId={props.todo.id} />
            );
          })}
        </ul>
      ) : null}
    </Fragment>
  );
};

export default TodoItem;
// className="btn btn-danger col-sm-1 align-self-center"
