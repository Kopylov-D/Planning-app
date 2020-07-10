import React, { useState } from 'react';
import Color from './Color';
import TodoItem from './TodoItem';

const Todo = (props) => {
  const [colorMenu, setColorMenu] = useState(false);
  const [lastColor, setLastColor] = useState({ id: 3, hex: '#7986CB', name: 'indigo' });

  const colorMenuToggle = () => {
    setColorMenu(!colorMenu);
  };

  const selectColor = (color) => {
    setLastColor(color);
    colorMenuToggle();
  };

  return (
    <div className="todolist">
      <h5 className='text-center'>{props.todoName}</h5>
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
          <div
            className={`color-btn color ${lastColor.name}`}
            // style={{ width: '25px', background: lastColor }}
            onClick={colorMenuToggle}
          ></div>
          <input
            type="text"
            className="form-control"
            placeholder="Новая задача"
            onChange={props.onChangeInput}
            onKeyDown={(event) =>
              props.addTodo(event, props.todoLevel, lastColor.id)
            }
          />
        </div>
        {colorMenu && (
          <ul className="color-menu">
            {props.colors.map((color) => {
              return (
                <Color
                  key={color.id}
                  color={color}
                  onClick={selectColor}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todo;
