import React from 'react';

const SubTask = (props) => {
  const classes = [];

  if (props.subtask.done) {
    classes.push('done')
  }

  return (
    <div>
      {props.subtask.idTodo === props.todoId ? (
        <li className="list-group-item note sub">
          <div className={classes.join(' ')}>
            {/* <input
              type="checkbox"
              checked={props.subtask.done}
              className="checkBox"
              onChange={() => props.onChecked(props.subtask.id)}
            ></input> */}
            {props.subtask.text}
          </div>

          <button
            type="button"
            className="btn btn-danger btn-sm sub"
            onClick={() => props.onClickDelete(props.subtask.id)}
          >
            &times;
          </button>
        </li>
      ) : null}
    </div>
  );
};

export default SubTask;
