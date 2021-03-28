import React, { useState, useEffect } from 'react';
import Board from './Board/Board';
import Menu from './Menu/Menu';
import './App.css';

const MAX_SPEED = 21;
const DEFAULT_MAP_IDX = 0;
const DEFAULT_SPEED_IDX = 9;
const DEFAULT_BOARD_IDX = 1;


const View = {
  InGame: 'INGAME',
  Home: 'HOME'
};

const Map = {
  Standard: 'STANDARD',
  NoWall: 'NOWALL'
}

class Setting {
  constructor(text, values, action) {
    this.text = text;
    this.values = values;
    this.action = action;
  }
}

const App = () => {
  const [view, setView] = useState(View.Home);
  const [mapIdx, setMapIdx] = useState(DEFAULT_MAP_IDX)
  const [speedIdx, setSpeedIdx] = useState(DEFAULT_SPEED_IDX);
  const [boardSizeIdx, setBoardSizeIdx] = useState(DEFAULT_BOARD_IDX);
  const [settingIdxs, setSettingIdx] = useState([mapIdx, speedIdx, boardSizeIdx]);
  const [topScore, setTopScore] = useState(0);
  const [mapSetting,] = useState(
    new Setting(
      'Map',
      [{ text: 'Standard', value: Map.Standard }, { text: 'No Wall', value: Map.NoWall }],
      i => setMapIdx(i))
  );
  const [speedSetting,] = useState(
    new Setting(
      'Speed',
      [...Array(MAX_SPEED).keys()].map(n => ({ text: n + 1, value: n + 1 })),
      i => setSpeedIdx(i))
  );
  const [boardSizeSetting,] = useState(
    new Setting(
      'Board Size',
      [...Array(4).keys()].map(n => ({ text: `${(n + 2) * 5} x ${(n + 2) * 5}`, value: (n + 2) * 5 })),
      i => setBoardSizeIdx(i))
  );

  useEffect(() => {
    setSettingIdx([mapIdx, speedIdx, boardSizeIdx])
  }, [mapIdx, speedIdx, boardSizeIdx]);

  const handleView = () => {
    if (view === View.InGame) {
      setView(View.Home);
    } else {
      setView(View.InGame);
    }
  };

  const handleTopScore = (s) => { setTopScore(s); };

  return (
    <div className='App'>{
      view === View.Home ?
        <Menu
          viewHandler={handleView}
          settingItems={[mapSetting, speedSetting, boardSizeSetting]}
          currentSettingIdxs={settingIdxs}>
        </Menu> :
        <Board
          hasWall={mapSetting.values[mapIdx].value === Map.Standard}
          speed={speedSetting.values[speedIdx].value}
          boardSize={boardSizeSetting.values[boardSizeIdx].value}
          topScore={topScore}
          topScoreHandler={handleTopScore}
          viewHandler={handleView}>
        </Board>
    }
    </div>
  );
}

export default App;