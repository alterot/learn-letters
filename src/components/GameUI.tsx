import React from 'react';
import { images } from './Images';

interface GameUIProps {
  score: number;
  image: string | null;
  feedback: string | null;
  showContinue: boolean;
  onStart: () => void;
  onContinue: () => void;
  onAnswer: () => void;
  gameStarted: boolean;
  gameCompletedBefore: boolean;
  userInput: string;
  gameFinished: boolean;
  gameMode: 'easy' | 'hard';
}

const GameUI: React.FC<GameUIProps> = ({
  score,
  image,
  feedback,
  showContinue,
  onStart,
  onContinue,
  onAnswer,
  gameStarted,
  gameCompletedBefore,
  userInput,
  gameFinished,
  gameMode,
}) => {
  return (
    <div>
      <p className="score-container">Poäng: {score} / {images.length}</p>

      <div className="image-container" style={{ position: 'relative', margin: '10px 0' }}>
        {image && (
          <img
            src={image}
            alt="current"
            style={{
              maxWidth: '100%',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        )}
        {feedback === 'Correct!' && <div className="feedback-icon correct">✔</div>}
        {feedback === 'Try again!' && <div className="feedback-icon incorrect">✖</div>}
      </div>

      {gameFinished && <p>🎉GRATTIS du klarade det!🎉</p>}

      {!gameStarted && (
        <button onClick={onStart}>
          {gameCompletedBefore ? 'SPELA IGEN' : 'SPELA'}
        </button>
      )}

      <button
        onClick={onContinue}
        style={{ visibility: showContinue && !gameFinished ? 'visible' : 'hidden' }}
      >
        NÄSTA
      </button>

      {gameStarted && (
        <>
          <input
            type="text"
            value={userInput}
            readOnly={showContinue}
            style={{
              border: 'none',
              borderBottom: '2px solid #333333',
              fontSize: '4em',
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
              width: gameMode === 'easy' ? '2em' : '12ch',
              margin: '20px 0',
              backgroundColor: '#f0f8ff',
              color: '#333333',
            }}
          />
          <button
            onClick={onAnswer}
            disabled={showContinue || gameFinished}
            style={{
              fontSize: '1.5em',
              padding: '10px 20px',
              opacity: showContinue || gameFinished ? 0.5 : 1,
              cursor: showContinue || gameFinished ? 'default' : 'pointer'
            }}
          >
            SVARA
          </button>
        </>
      )}
    </div>
  );
};

export default GameUI;
