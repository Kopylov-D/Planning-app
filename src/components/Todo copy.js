import React from 'react';
import TodoItem from './TodoItem';


const Todo = (props) => {
  return (
    <div className="todolist">
      <h2>{props.todoName}</h2>
      <ul className="list-group">
        {props.todos.map((todo, index) => {
          if (todo.idCategory === props.todoName) {
            return (
              <TodoItem
                key={index}
                todo={todo}
                todoName={props.todoName}
                subtasksIsOpen={todo.subtasksIsOpen}
                subtasks={props.subtasks}
                notes={props.notes}
                onClickTodo={props.onClickTodo}
                onClickDelete={props.onClickDelete}
                onClickDeleteSubtask={props.onClickDeleteSubtask}
                onKeyEnterSubtask={props.onKeyEnterSubtask}
                onChecked={props.onChecked}
                onClickSubtaskOpen={props.onClickSubtaskOpen}
                onClickDecomposeOnTodo={props.onClickDecomposeOnTodo}
                onChangeNotes={props.onChangeNotes}
              />
            )
          }
         
          // ) : null}
        })}
      </ul>
      {/* <Fragment> */}
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">
              +
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Новая задача"
            onChange={props.onChangeInput}
            onKeyDown={(event) => props.onKeyEnter(event, props.todoName)}
          />
        </div>
      {/* </Fragment> */}
    </div>
  );
};

export default Todo;
