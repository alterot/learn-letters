import { useState, useEffect } from 'react';
import apaImage from '../images/apa.jpg';
import bananImage from '../images/banan.jpg';
import cykelImage from '../images/cykel.jpg';
import GameUI from './GameUI';

const Game: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showContinue, setShowContinue] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompletedBefore, setGameCompletedBefore] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const images = [
    { src: apaImage, name: 'apa' },
    { src: bananImage, name: 'banan' },
    { src: cykelImage, name: 'cykel' },
  ];

  const startGame = () => {
    setScore(0); // Reset score when starting a new game
    setShowContinue(false);
    setFeedback(null);
    setImage(null);
    setGameFinished(false);
    setGameStarted(true);
    setUserInput(''); // Reset user input
    continueGame();
  };

  const continueGame = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImage(randomImage.src);
    setFeedback(null);
    setShowContinue(false);
    setUserInput(''); 
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    setUserInput(key);
    if (image && !gameFinished) {
      const currentImage = images.find(img => img.src === image);
      if (currentImage && key === currentImage.name[0].toUpperCase()) {
        setFeedback('Correct!');
        setScore(prevScore => {
          const newScore = prevScore + 1;
          if (newScore === 5) {
            setFeedback('Congratulations! You\'ve finished the game with a score of 5!');
            setShowContinue(false); // Hide the continue button when the game is finished
            setGameFinished(true); // Mark the game as finished
            setGameStarted(false); // Mark the game as not started
            setGameCompletedBefore(true); // Mark the game as completed before
          } else {
            setShowContinue(true);
          }
          return newScore;
        });
      } else {
        setFeedback('Try again!');
        setShowContinue(true);
      }
    }
  };

  useEffect(() => {
    if (!gameFinished) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [image, gameFinished]);

  return (
    <GameUI
      score={score}
      image={image}
      feedback={feedback}
      showContinue={showContinue}
      onStart={startGame}
      onContinue={continueGame}
      gameStarted={gameStarted}
      gameCompletedBefore={gameCompletedBefore}
      userInput={userInput}
    />
  );
};

export default Game;