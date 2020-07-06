import React from 'react';

const SubTask = (props) => {
  const classes = [];

  if (props.subtask.done) {
    classes.push('done');
  }

  return (
    <div>
        <li className="list-group-item todo sub">
          <button
            type="button"
            className={'btn btn-primary btn-sm'}
            onClick={() => props.onClickDecomposeTodo(props.subtask)}
          >
            -
          </button>
          <div className={classes.join(' ')}>{props.subtask.text}</div>

          <button
            type="button"
            className="btn btn-danger btn-sm sub"
            onClick={() => props.onClickDelete(props.subtask.id)}
          >
            &times;
          </button>
        </li>
    </div>
  );
};

export default SubTask;
