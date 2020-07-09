import React from 'react';

const Task = (props) => {
  const classes = [];

  if (props.task.done) {
    classes.push('done');
  }

  return (
    <li
      // style={{ background: props.color }}
      className={`list-group-item todo sub color ${props.color}`}
    >
      <button
        type="button"
        className={'btn btn-primary btn-sm'}
        onClick={() => props.decomposeTodo(props.task)}
      >
        +
      </button>
      <div className={classes.join(' ')}>{props.task.text}</div>

      <button
        type="button"
        className="btn btn-danger btn-sm sub"
        onClick={() => props.deleteTask(props.task.id)}
      >
        &times;
      </button>
    </li>
  );
};

export default Task;
