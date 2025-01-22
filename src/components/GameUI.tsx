import React from 'react';

interface GameUIProps {
  score: number;
  image: string | null;
  feedback: string | null;
  showContinue: boolean;
  onStart: () => void;
  onContinue: () => void;
  gameStarted: boolean;
  gameCompletedBefore: boolean;
}

const GameUI: React.FC<GameUIProps> = ({ score, image, feedback, showContinue, onStart, onContinue, gameStarted, gameCompletedBefore }) => {
  return (
    <div>
      <h1>Score: {score}</h1>
      {image && <img src={image} alt="current" />}
      {feedback && <p>{feedback}</p>}
      {!gameStarted && (
        <button onClick={onStart}>
          {gameCompletedBefore ? 'Start Over' : 'Start'}
        </button>
      )}
      {showContinue && <button onClick={onContinue}>Continue</button>}
    </div>
  );
};

export default GameUI;