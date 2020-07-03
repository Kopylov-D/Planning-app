import React from 'react';

const SubTask = (props) => {
  const classes = [];

  if (props.done) {
    classes.push('done');
  }

  // const decomposeOnTodo = (subtask, idCategory) => {
  //   return {
  //     id: subtask.id,
  //     idCategory,
  //     text: subtask.text,
  //     done: false,
  //     subtasksIsOpen: false,
  //   };
  // };

  return (
    <div>
      {props.subtask.idTodo === props.todoId ? (
        <li className="list-group-item todo sub">
          <button 
          type="button"
          onClick={(event) => props.onClickDecomposeOnTodo(event, props.subtask)}
            >
            -
          </button>
          <div className={classes.join(' ')}>{props.subtask.text}</div>

          <button
            type="button"
            className="btn btn-danger btn-sm sub"
            onClick={() => props.onClickDeleteSubtask(props.subtask.id)}
          >
            &times;
          </button>
        </li>
      ) : null}
    </div>
  );
};

export default SubTask;
