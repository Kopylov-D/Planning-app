import React, { Fragment } from 'react';
import SubTask from './SubTask';

const TodoItem = (props) => {
  const classes = ['todo'];

  if (props.todo.done) {
    classes.push('done');
  }

  if (props.className) {
    classes.push(props.className);
  }

  return (
    
    <Fragment>
      <li
        className="list-group-item todo"
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
          <button
            type="button"
            className="btn-toggle"
            onClick={() => props.onClickSubtaskOpen(props.todo.id)}
          ></button>
        </div>

        {/* <div className="btn-group dropright"> */}

        {/* </div> */}

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => props.onClickDelete(props.todo.id)}
        >
          &times;
        </button>
      </li>

      {props.subtasksIsOpen ? (
        <Fragment>
          <ul className="list-group sub">
            {props.subtasks.map((task, index) => {
              return (
                <SubTask
                  key={index}
                  subtask={task}
                  todoId={props.todo.id}
                  done={props.todo.done}
                  onClickDeleteSubtask={props.onClickDeleteSubtask}
                  onClickDecomposeOnTodo={props.onClickDecomposeOnTodo}
                />
              );
            })}
          </ul>
          <div className="input-group flex-nowrap sub">
            <input
              type="text"
              className="form-control"
              placeholder="Новая подзадача"
              onChange={props.onChangeInput}
              onKeyDown={(event) =>
                props.onKeyEnterSubtask(
                  event,
                  props.todo.id
                )
              }
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default TodoItem;
// className="btn btn-danger col-sm-1 align-self-center"
