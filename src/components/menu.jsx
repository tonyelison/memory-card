import '../styles/menu.css'

const Menu = ({ setGameDifficulty }) => {
  return (
  <div className="menu">
    <div>Choose Difficulty:</div>
    <div className="game-options">
      <button onClick={() => setGameDifficulty('easy')}>Easy</button>
      <button onClick={() => setGameDifficulty('medium')}>Medium</button>
      <button onClick={() => setGameDifficulty('hard')}>Hard</button>
    </div>
  </div>);
};

export default Menu;