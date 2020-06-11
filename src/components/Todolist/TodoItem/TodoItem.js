import React from 'react';

const TodoItem = (props) => {
  return (
    <li
      className="list-group-item note"
      onClick={() => props.onClickTodo(props.item.id)}
    >
      <div>
        <strong> {props.item.id}</strong>. {props.item.text}
      </div>

      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => props.onClickDelete(props.item.id)}
      >
        &times;
      </button>
    </li>
  );
};

export default TodoItem;
// className="btn btn-danger col-sm-1 align-self-center"
