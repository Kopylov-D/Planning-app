import React from 'react';

function SubTask(props) {
  return (
    <li className="list-group-item sub">
      <input
        type="checkbox"
        // checked={props.todo.done}
        className="checkBox"
        onChange={() => props.onChecked(props.todo.id)}
      ></input>
      {props.todo.text}
    </li>
  );
}

export default SubTask;
