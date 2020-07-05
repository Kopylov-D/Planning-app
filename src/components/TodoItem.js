import React, { Fragment } from 'react';
import SubTask from './SubTask';

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
      {!props.todo.isSubtask ? (
        <Fragment>
          <li
            className="list-group-item todo"
            onClick={() => props.onClickTodo(props.todo.id)}
          >
            <div className={classes.join(' ')}>
              <input
                type="checkbox"
                checked={props.todo.done}
                className="checkBox"
                onChange={() => props.onChecked(props.todo.id)}
              ></input>
              {props.todo.text}
              <button
                type="button"
                className="btn-toggle"
                onClick={() => props.onClickSubtaskOpen(props.todo.id)}
              ></button>
            </div>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => props.onClickDelete(props.todo.id)}
            >
              &times;
            </button>
          </li>
          <div className="input-group flex-nowrap sub">
            <input
              type="text"
              className="form-control"
              placeholder="Новая подзадача"
              onChange={props.onChangeInput}
              onKeyDown={(event) =>
                props.onInputSubtask(
                  event,
                  props.todo.idTodo,
                  props.todo.idCategory,
                  props.todo
                )
              }
            />
          </div>
        </Fragment>
      ) : null}

      {props.subtasksIsOpen ? (
        <ul className="list-group sub">
          {props.subtasks
            .filter((subtask) => subtask.idTodo === props.todo.id && subtask.isSubtask)
            .map((subtask, index) => {
              return (
                <SubTask
                  key={index}
                  subtask={subtask}
                  idTodo={props.todo.id}
                  done={subtask.done}
                  onClickDelete={props.onClickDelete}
                  //  onClickDecomposeOnTodo={props.onClickDecomposeOnTodo}
                />
              );
            })}
        </ul>
      ) : null}

      {/* {props.subtasksIsOpen ? (
        props.todoName === 'День' ? (
          <textarea
            className="form-control"
            onChange={(event) => props.onChangeNotes(event, props.todo.id)}
            value={props.notes.filter((note) => note.idTodo === props.todo.id)[0].text}
          ></textarea>
        ) : (
          <Fragment>
            <ul className="list-group sub">
              {props.subtasks.map((task, index) => {
                return (
                  <SubTask
                    key={index}
                    subtask={task}
                    todoId={props.todo.id}
                    done={props.todo.done}
                    onClickDeleteSubtask={props.onClickDeleteSubtask}
                    onClickDecomposeOnTodo={props.onClickDecomposeOnTodo}
                  />
                );
              })}
            </ul>
            <div className="input-group flex-nowrap sub">
              <input
                type="text"
                className="form-control"
                placeholder="Новая подзадача"
                onChange={props.onChangeInput}
                onKeyDown={(event) =>
                  props.onKeyEnterSubtask(event, props.todo.id)
                }
              />
            </div>
          </Fragment>
        )
      ) : null} */}
    </Fragment>
  );
};

export default TodoItem;
// className="btn btn-danger col-sm-1 align-self-center"
