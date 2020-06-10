import React from 'react';

const TodoItem = (props) => {
  return (
    <div className="row">
      <li
        className="list-group-item col"
        onClick={() => props.onClickTodo(props.item.id)}
      >
        <strong> {props.item.id}</strong>. {props.item.text}
      </li>
      <button
        type="button"
        style={{ width: '15px' }}
        className="btn btn-danger align-self-center"
        onClick={() => props.onClickDelete(props.item.id)}
      >
        x
      </button>
    </div>
  );
};

export default TodoItem;
// className="btn btn-danger col-sm-1 align-self-center"
