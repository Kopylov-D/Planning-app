import React from 'react';
import './App.css';
import Todo from './containers/Todo';


function App() {
  return (
    <div className={'container-sm row'}>
      <Todo className={'col-3'}/>
      <Todo className={'col-3'}/>
      <Todo className={'col-3'}/>
    </div>
  );
}

export default App;