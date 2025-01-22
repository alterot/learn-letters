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
  userInput: string;
}

const GameUI: React.FC<GameUIProps> = ({ score, image, feedback, showContinue, onStart, onContinue, gameStarted, gameCompletedBefore, userInput }) => {
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
      {gameStarted && (
        <input
          type="text"
          value={userInput}
          readOnly
          style={{
            border: 'none',
            borderBottom: '2px solid black',
            fontSize: '2em',
            textAlign: 'center',
            textTransform: 'uppercase',
            width: '2em',
            margin: '20px 0',
          }}
        />
      )}
    </div>
  );
};

export default GameUI;