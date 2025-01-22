import './App.css';
import Game from './components/Game';

export default function App() {
  return (
    <div className="header-container">
      <h1>Välkommen till bokstavsspelet</h1>
      <Game />
    </div>
  );
}