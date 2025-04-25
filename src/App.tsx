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
      <h1>
        {gameMode === 'easy' && 'Vilken bokstav börjar ordet på?'}
        {gameMode === 'hard' && 'Kan du stava till hela ordet?'}
        {gameMode === null && 'Välkommen till bokstavspelet!'}
      </h1>

      {gameMode !== null && (
        <button
          onClick={() => setGameMode(null)}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'none',
            border: 'none',
            color: '#555',
            fontSize: '1em',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          ← Tillbaka
        </button>
      )}

      {gameMode === null ? (
        <GameModeSelection onSelectMode={handleSelectMode} />
      ) : (
        <Game gameMode={gameMode} startImmediately={true} />
      )}
    </div>
  );
}
