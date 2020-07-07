import React, { Fragment } from 'react';
import Task from './Task';

const TodoItem = (props) => {
  const classes = ['todo'];

  if (props.todo.done) {
    classes.push('done');
  }

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <Fragment>
      <li
        className={`list-group-item todo color ${props.color.name}`}
        onClick={() => props.onClickTodo(props.todo.id)}
      >
        <div className={classes.join(' ')}>
          <input
            type="checkbox"
            checked={props.todo.done}
            className="checkBox"
            onChange={() =>
              props.onChecked(props.todo.id)
            }
          ></input>
          {props.todo.text}
          <button
            type="button"
            className="btn-toggle"
            onClick={() => props.openTasks(props.todo.id)}
          ></button>
        </div>

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => props.deleteTodo(props.todo.id)}
        >
          &times;
        </button>
      </li>

      {props.todo.tasksIsOpen && (
        <ul className="list-group sub">
          {props.todo.category === 'День' ? (
            props.notes.map((note) => {
              if (note.idTodo === props.todo.id) {
                return (
                  <textarea
                    key={note.id}
                    value={note.text}
                    onChange={(event) => props.noteInput(event, props.todo.id)}
                    placeholder="Доп информация"
                  ></textarea>
                );
              }
            })
          ) : (
            <Fragment>
              {props.tasks
                .filter((task) => task.idTodo === props.todo.id)
                .map((task, index) => {
                  return (
                    <Task
                      key={index}
                      task={task}
                      idTodo={props.todo.id}
                      color={props.color.name}
                      deleteTask={props.deleteTask}
                      decomposeTodo={props.decomposeTodo}
                    />
                  );
                })}
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control sub"
                  placeholder="Новая подзадача"
                  onChange={props.onChangeInput}
                  onKeyDown={(event) => props.addTask(event, props.todo.id)}
                />
              </div>
            </Fragment>
          )}
        </ul>
      )}
    </Fragment>
  );
};

export default TodoItem;
