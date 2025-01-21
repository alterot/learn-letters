import { useState } from 'react';
import apaImage from '../images/apa.jpg';
import bananImage from '../images/banan.jpg';
import cykelImage from '../images/cykel.jpg';

const Game: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const images: string[] = [apaImage, bananImage, cykelImage];

  const startGame: () => void = () => {
    const randomImage: string = images[Math.floor(Math.random() * images.length)];
    setImage(randomImage);
  };

  return (
    <div>
      <button onClick={startGame}>Starta</button>
      {image && <img src={image} alt="Random" />}
    </div>
  );
};

export default Game;