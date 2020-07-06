import React from 'react';
import TodoItem from './TodoItem';

const Todo = (props) => {
  return (
    <div className="todolist">
      <h5>{props.todoName}</h5>
      <ul className="list-group">
        {props.todos.map((todo, index) => {
          if (todo.category === props.todoName) {
            return (
              <TodoItem
                key={index}
                todo={todo}
                todoName={props.todoName}
                tasks={props.tasks}
                notes={props.notes}
                colors={props.colors}
                onClickTodo={props.onClickTodo}
                onClickDelete={props.onClickDelete}
                addTask={props.addTask}
                onChecked={props.onChecked}
                openTasks={props.openTasks}
                onClickDecomposeTodo={props.onClickDecomposeTodo}
                onChangeNotes={props.onChangeNotes}
              />
            );
          }
        })}
      </ul>
      <div className="input-group flex-nowrap">
        <div className="input-group-prepend">
          <select name="select">
            <option value="value1">{props.colors[0].name}</option>
            <option value="value2">{props.colors[1].name}</option>
            <option value="value3">{props.colors[2].name}</option>
          </select>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Новая задача"
          onChange={props.onChangeInput}
          onKeyDown={(event) =>
            props.addTodo(
              event,
              props.todoName,
              props.idTodo,
              props.idDecompose
            )
          }
        />
      </div>
    </div>
  );
};

export default Todo;
