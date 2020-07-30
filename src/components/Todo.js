import React, { useState } from 'react';
import Color from './Color';
import TodoItem from './TodoItem';
import { CSSTransition } from 'react-transition-group';

const Todo = (props) => {
  const [colorMenu, setColorMenu] = useState(false);
  const [lastColor, setLastColor] = useState({ id: 3, name: 'indigo' });

  const colorMenuToggle = () => {
    setColorMenu(!colorMenu);
  };

  const selectColor = (color) => {
    setLastColor(color);
    colorMenuToggle();
  };

  return (
    <div className="todolist">
      <h5 className="text-center m-1">{props.todoName}</h5>
      <ul className="list-group">
        {props.todos.map((todo, index) => {
          if (todo.todoLevel === props.todoLevel) {
            return (
              <TodoItem
                key={index}
                todo={todo}
                todoLevel={props.todoLevel}
                tasks={props.tasks}
                notes={props.notes}
                color={props.colors.find((color) => color.id === todo.colorId)}
                onClickTodo={props.onClickTodo}
                deleteTodo={props.deleteTodo}
                deleteTask={props.deleteTask}
                addTask={props.addTask}
                onChecked={props.onChecked}
                openTasks={props.openTasks}
                decomposeTodo={props.decomposeTodo}
                noteInput={props.noteInput}
              />
            );
          }
        })}
      </ul>

      <div>
        <div className="input-group flex-nowrap">
          <i
            className={`fa fa-retweet color-btn color ${lastColor.name}`}
            onClick={colorMenuToggle}
          ></i>
          <input
            type="text"
            className="form-control"
            placeholder="Новая задача"
            onChange={props.onChangeInput}
            onKeyDown={(event) => props.addTodo(event, props.todoLevel, lastColor.id)}
          />
        </div>

        <CSSTransition
          in={colorMenu}
          classNames={'color-menu'}
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <ul className="color-menu">
            {props.colors.map((color) => {
              return <Color key={color.id} color={color} onClick={selectColor} />;
            })}
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Todo;
