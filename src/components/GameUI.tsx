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
      <h1 className="score-container">Score: {score}</h1>
      <div className="image-container" style={{ position: 'relative' }}>
        {image && <img src={image} alt="current" />}
        {feedback === 'Correct!' && <div className="feedback-icon correct">✔</div>}
        {feedback === 'Try again!' && <div className="feedback-icon incorrect">✖</div>}
      </div>
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
            fontSize: '4em',
            fontWeight: 'bold',
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