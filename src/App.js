import React from 'react';

import Main from './containers/Main';
import Header from './containers/Header';

function App() {
  return (
    <div className={'container-sm pl-0 pr-0'}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
