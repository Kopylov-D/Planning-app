import React, { Fragment } from 'react';

import Task from './Task';

const TodoItem = (props) => {
  const classes = [];

  if (props.todo.done) {
    classes.push('done');
  }

  if (props.className) {
    classes.push(props.className);
  }

  let arrowType = 'down'
  if (props.todo.tasksIsOpen) {
    arrowType = 'up'
  }

  const tasksNum = props.tasks.filter((task) => task.idTodo === props.todo.id).length;
  const doneTasks = props.tasks.filter(
    (task) => task.idTodo === props.todo.id && task.done
  ).length;

  return (
    <Fragment>
      <li
        className={`list-group-item todo color ${props.color.name}`}
        onClick={() => props.onClickTodo(props.todo.id)}
      >
        <div className="todo">
          <input
            type="checkbox"
            checked={props.todo.done}
            className="check-box"
            onChange={() =>
              props.onChecked(
                props.todo.id,
                props.todo.parentId,
                props.todo.idTodo,
                props.todo.todoLevel
              )
            }
          ></input>
          <div className={`ml-2 ${classes.join(' ')}`}>{props.todo.text}</div>
          <i
            className={`fa fa-chevron-${arrowType} arrow` }
            aria-hidden="true"
            onClick={() => props.openTasks(props.todo.id)}
          ></i>
          {props.todoLevel !== 1 && (
            <div className="badge badge-primary text-wrap counter">
              {doneTasks}/{tasksNum}
            </div>
          )}
        </div>

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => props.deleteTodo(props.todo.id, props.todo.key)}
        >
          &times;
        </button>
      </li>

      {props.todo.tasksIsOpen && (
        <ul className="list-group sub">
          {props.todoLevel === 1 ? (
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
                  onKeyDown={(event) =>
                    props.addTask(event, props.todo.id, props.todo.parentId)
                  }
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
