import React, { useState, useEffect, useCallback } from 'react';
import { images } from './Images';
import GameUI from './GameUI';
import correctSound from '../sounds/correct.wav';
import incorrectSound from '../sounds/incorrect.wav';

const correctAudio = new Audio(correctSound);
const incorrectAudio = new Audio(incorrectSound);

interface GameProps {
  gameMode: 'easy' | 'hard';
}

const Game: React.FC<GameProps> = ({ gameMode }) => {
  const [image, setImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showContinue, setShowContinue] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompletedBefore, setGameCompletedBefore] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [remainingImages, setRemainingImages] = useState(images); // New state for remaining images

  useEffect(() => {
    // Preload audio files
    correctAudio.load();
    incorrectAudio.load();
  }, []);

  const startGame = () => {
    setScore(0); // Reset score when starting a new game
    setShowContinue(false);
    setFeedback(null);
    setImage(null);
    setGameFinished(false);
    setGameStarted(true);
    setUserInput(''); // Reset user input
    setRemainingImages(images); // Initialize remaining images
  };

  const continueGame = useCallback(() => {
    if (remainingImages.length === 0) {
      setGameFinished(true);
      setGameStarted(false);
      setFeedback('GRATTIS! Du klarade alla bilderna! 🎉');
      setGameCompletedBefore(true); // Update gameCompletedBefore when game is finished
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingImages.length);
    const randomImage = remainingImages[randomIndex];
    setImage(randomImage.src);
    setFeedback(null);
    setShowContinue(false);
    setUserInput(''); // Reset user input
  }, [remainingImages]);

  useEffect(() => {
    if (gameStarted && !gameFinished && image === null) {
      continueGame();
    }
  }, [gameStarted, gameFinished, image, continueGame]);
  

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Tillåt Enter även när feedback visas, blockera övrig input
    if (showContinue && event.key !== 'Enter') return;
  
    const key = event.key.toUpperCase();
  
    // Backspace stöd
    if (event.key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
      return;
    }
  
    if (key === 'ENTER') {
      if (!gameStarted) {
        startGame();
      } else if (showContinue && !gameFinished) {
        continueGame();
      } else if (gameFinished) {
        startGame();
      } else if (image) {
        const currentImage = images.find(img => img.src === image);
        if (currentImage) {
          const guess = userInput.toLowerCase();
  
          // 👇 Stöd för både sträng och array av namn
          const acceptedNames = Array.isArray(currentImage.name)
            ? currentImage.name.map(n => n.toLowerCase())
            : [currentImage.name.toLowerCase()];
  
          const isCorrect =
            (gameMode === 'easy' && acceptedNames.some(name => name[0] === guess[0])) ||
            (gameMode === 'hard' && acceptedNames.includes(guess));
  
          if (isCorrect) {
            setFeedback('Correct!');
            setScore(prev => prev + 1);
            setRemainingImages(prev => prev.filter(img => img.src !== image));
            setShowContinue(true);
            correctAudio.play();
          } else {
            setFeedback('Try again!');
            setShowContinue(true);
            incorrectAudio.play();
          }
        }
      }
      return;
    }
  
    // Lägg till bokstav om inte spärrat
    setUserInput(prevInput => prevInput + key);
  }, [gameStarted, showContinue, gameFinished, image, gameMode, userInput, continueGame]);
  
  

  useEffect(() => {
    if (!gameFinished) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, gameFinished]);

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
      gameFinished={gameFinished} // Pass gameFinished state
      gameMode={gameMode} // Pass gameMode state
    />
  );
};

export default Game;