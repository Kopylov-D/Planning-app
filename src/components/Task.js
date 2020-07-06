import React from 'react';

const Task = (props) => {
  const classes = [];

  if (props.task.done) {
    classes.push('done');
  }

  return (
    <div>
      <li className="list-group-item todo sub">
        <button
          type="button"
          className={'btn btn-primary btn-sm'}
          onClick={() => props.onClickDecomposeTodo(props.task)}
        >
          -
        </button>
        <div className={classes.join(' ')}>{props.task.text}</div>

        <button
          type="button"
          className="btn btn-danger btn-sm sub"
          onClick={() => props.onClickDelete(props.task.id)}
        >
          &times;
        </button>
      </li>
    </div>
  );
};

export default Task;
