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
    continueGame();
  };

  const continueGame = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImage(randomImage.src);
    setFeedback(null);
    setShowContinue(false);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (image) {
      const currentImage = images.find(img => img.src === image);
      if (currentImage && event.key.toLowerCase() === currentImage.name[0]) {
        setFeedback('Correct!');
        setScore(prevScore => {
          const newScore = prevScore + 1;
          if (newScore === 5) {
            setFeedback('Congratulations! You\'ve finished the game with a score of 5!');
            setShowContinue(false); // Hide the continue button when the game is finished
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
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [image]);

  return (
    <GameUI
      score={score}
      image={image}
      feedback={feedback}
      showContinue={showContinue}
      onStart={startGame}
      onContinue={continueGame}
    />
  );
};

export default Game;