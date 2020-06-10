import React from 'react';

const TodoItem = (props) => {
  return (
    <div>
      <li className="list-group-item" onClick={() => props.onClickTodo(props.item.id)}>
        <strong> {props.item.id}</strong>. {props.item.text}
      </li>
    </div>
  );
};

export default TodoItem;
