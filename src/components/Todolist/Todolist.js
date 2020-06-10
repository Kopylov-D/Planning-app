import React from 'react';
import TodoItem from './TodoItem/TodoItem';

const Todolist = (props) => {
  return (
    <div className={"Todolist"}>
      <h2>Задачи на день</h2>
      <ul className="list-group">
        {props.todoItem.map((item, index) => {
         return (
          <TodoItem
          key={index}
          item={item}
          onClickTodo={props.onClickTodo}
          />
         )
        })}
      </ul>
    </div>
  );
};

export default Todolist;
