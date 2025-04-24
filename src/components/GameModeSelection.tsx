import React from 'react';

interface GameModeSelectionProps {
  onSelectMode: (mode: 'easy' | 'hard') => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelectMode }) => {
  return (
    <div className="game-mode-selection">
       <p>Vem spelar idag?</p>
      <button onClick={() => onSelectMode('easy')}>HEDDA</button>
      <button onClick={() => onSelectMode('hard')}>SELMA</button>
    </div>
  );
};

export default GameModeSelection;