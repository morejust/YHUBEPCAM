import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

import Pay from './screens/Pay.js'
import Main from './screens/Main.js'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/pay" component={Pay} />
        <Route exact path="/" component={Main} />
      </div>
    </BrowserRouter>
  );
}

export default App;
