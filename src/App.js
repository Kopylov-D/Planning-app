import React from 'react';
import './App.css';
import Main from './containers/Main';
import Header from './containers/Header';

function App() {
  return (
    <div className={'container-fluid'}>
      <Header/>
      <Main />
    </div>
  );
}

export default App;
