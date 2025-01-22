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
  gameFinished: boolean; // Add gameFinished prop
}

const GameUI: React.FC<GameUIProps> = ({ score, image, feedback, showContinue, onStart, onContinue, gameStarted, gameCompletedBefore, userInput, gameFinished }) => {
  return (
    <div>
      <h1 className="score-container">Poäng: {score} / 6</h1>
      <div className="image-container" style={{ position: 'relative' }}>
        {image && <img src={image} alt="current" />}
        {feedback === 'Correct!' && <div className="feedback-icon correct">✔</div>}
        {feedback === 'Try again!' && <div className="feedback-icon incorrect">✖</div>}
      </div>
      {gameFinished && <p>🎉GRATTIS du klarade det!🎉</p>}
      {!gameStarted && (
        <button onClick={onStart}>
          {gameCompletedBefore ? 'Spela igen' : 'Spela'}
        </button>
      )}
      {showContinue && <button onClick={onContinue}>Nästa</button>}
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