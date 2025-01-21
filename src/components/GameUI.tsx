interface GameUIProps {
  score: number;
  image: string | null;
  feedback: string | null;
  showContinue: boolean;
  onStart: () => void;
  onContinue: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  score,
  image,
  feedback,
  showContinue,
  onStart,
  onContinue,
}) => {
  return (
    <div>
      <h2>Score: {score}</h2>
      <button onClick={onStart}>Starta</button>
      {image && <img src={image} alt="Random" />}
      {feedback && <p>{feedback}</p>}
      {showContinue && <button onClick={onContinue}>Continue</button>}
    </div>
  );
};

export default GameUI;