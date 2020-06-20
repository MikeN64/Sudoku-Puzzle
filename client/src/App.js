import React from 'react';
import './App.css';

import Gameboard from './Gameboard/Gameboard.js'

function App() {
  return (
    <div className="App">
      <h1>Sudoku</h1>
      <header className="App-header">
        <button>Play Game!</button>
      </header>
      <Gameboard />
    </div>
  );
}

export default App;
