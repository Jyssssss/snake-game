import React, { useState, useEffect } from 'react';
import Board from './Board/Board';
import Menu from './Menu/Menu';
import './App.css';

const View = {
  InGame: 'INGAME',
  Home: 'HOME'
};

const App = () => {
  const [view, setView] = useState(View.Home);
  const [speed, setSpeed] = useState(19);
  const [boardSize, setBoardSize] = useState(15);
  const [topScore, setTopScore] = useState(0);

  const handleView = () => {
    if (view === View.InGame) {
      setView(View.Home);
    } else {
      setView(View.InGame);
    }
  };

  const handleTopScore = (s) => { setTopScore(s); };

  return (
    <div className="App">{
      view === View.Home ?
        <Menu viewHandler={handleView}></Menu> :
        <Board
          speed={speed}
          boardSize={boardSize}
          topScore={topScore}
          topScoreHandler={handleTopScore}
          viewHandler={handleView}>
        </Board>
    }
    </div>
  );
}

export default App;