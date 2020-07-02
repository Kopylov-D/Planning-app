import React, { Fragment } from 'react';
import TodoItem from './TodoItem/TodoItem';

const Todolist = (props) => {
  return (
    <div className={'todolist'}>
      <h2>{props.header}</h2>
      <ul className="list-group">
        {props.todoItem.map((item, index) => {
          return (
            <TodoItem
              key={index}
              item={item}
              onClickTodo={props.onClickTodo}
              onClickDelete={props.onClickDelete}
            />
          );
        })}
      </ul>
      <Fragment>
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">
              +
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Введите задачу"
            onChange={props.onChangeInput}
            onKeyDown={(event) =>
              props.onKeyEnter(event, props.todoItem.length)
            }
          />
        </div>
      </Fragment>
    </div>
  );
};

export default Todolist;
