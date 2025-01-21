import { useState, useEffect } from 'react';
import apaImage from '../images/apa.jpg';
import bananImage from '../images/banan.jpg';
import cykelImage from '../images/cykel.jpg';

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
        setScore(prevScore => prevScore + 1);
      } else {
        setFeedback('Try again!');
      }
      setShowContinue(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [image]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <button onClick={startGame}>Starta</button>
      {image && <img src={image} alt="Random" />}
      {feedback && <p>{feedback}</p>}
      {showContinue && <button onClick={startGame}>Continue</button>}
    </div>
  );
};

export default Game;