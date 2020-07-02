import React, { Component } from 'react';
import Todo from './Todo';
import Context from './context';

export class Main extends Component {
 state = {
  todoNames: ['Задачи на день', 'Задачи на неделю', 'Задачи на месяц']
 }
  render() {
    return (
        <div className="main">
          <Todo todoName={this.state.todoNames[0]}/>
          <Todo todoName={this.state.todoNames[1]}/>
          <Todo todoName={this.state.todoNames[2]}/>
        </div>
    );
  }
}

export default Main;
