import { useState } from 'react'
import '../styles/card-list.css'
import api from '../api.js'
import Card from './card.jsx'

const difficulty = {
  easy: 4,
  medium: 6,
  hard: 10,
};

let listLength;

const CardList = () => {
  const [cardList, setCardList] = useState([]);
  const [blackList, setBlackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  
  const randomInt = (max) => Math.floor(Math.random() * max);
  
  const generateRandomIndices = (max, length) => {
    const indices = [];
    while (indices.length < length) {
      const newIndex = randomInt(max - 1);
      if (!indices.includes(newIndex)) {
        indices.push(newIndex);
      }
    }
    return indices;
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const refreshList = async () => {
    setIsLoading(true)
    await api.getList()
      .then(async (list) => {
        const randomIndices = generateRandomIndices(list.count, listLength - blackList.length);
        const newList = randomIndices.map((index) => list.results[index].name);
        
        newList.push(...blackList);
        shuffle(newList);

        const queryForEachId = () => newList.map((id) => api.getById(id));

        const queriedList = await Promise.all(queryForEachId());
        setCardList(queriedList);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  function addToBlackList(id) {
    if (blackList.includes(id)) {
      gameOver();
      return;
    }

    blackList.push(id);
    setBlackList([...blackList]);
    
    blackList.length === listLength ? gameOver(true) : refreshList();
  }

  const clearList = () => {
    blackList.length = 0;
    setBlackList([]);
    setCardList([]);
  }

  const gameOver = (didWin) => {
    setGameResult(`You ${didWin ? 'Won' : 'Lose'}!`);
    clearList();
  }

  const resetGame = () => {
    clearList();
    setGameResult(null);
  }

  const setGameDifficulty = (setting) => {
    listLength = difficulty[setting];
    refreshList();
  }

  const renderGame = () => {
    return (
    <>
      <div className="card-list">
        {cardList.map((item) => {
          const details = {
            id: item.id,
            name: item.name,
            'image-url': item.sprites['front_default'] || './public/decamark.png',
          };
          return (<Card key={item.id} details={details} addToBlackList={addToBlackList} />)
        })}
      </div>
    </>);
  };

  return (
    <div className="container">
      {!isLoading && !cardList.length && !gameResult ?
        <div className="menu">
          <div>Choose Difficulty:</div>
          <div className="game-options">
            <button onClick={() => setGameDifficulty('easy')}>Easy</button>
            <button onClick={() => setGameDifficulty('medium')}>Medium</button>
            <button onClick={() => setGameDifficulty('hard')}>Hard</button>
          </div>
        </div> :
        <div className="game">
          {isLoading ? "Loading..." :
          <>
            {gameResult ? <div>{gameResult}</div> : renderGame()}
            <button className="restart" onClick={resetGame} disabled={isLoading}>Restart</button>
          </>
          }
        </div>
      }
    </div>
  );
}

export default CardList;
