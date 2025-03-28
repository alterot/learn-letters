import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import GameModeSelection from './components/GameModeSelection';

export default function App() {
  const [gameMode, setGameMode] = useState<'easy' | 'hard' | null>(null);

  const handleSelectMode = (mode: 'easy' | 'hard') => {
    setGameMode(mode);
  };

  return (
    <div className="header-container">
      <h1>Lär dig bokstäver!</h1>
      {gameMode === null ? (
        <GameModeSelection onSelectMode={handleSelectMode} />
      ) : (
        <Game gameMode={gameMode} />
      )}
    </div>
  );
}