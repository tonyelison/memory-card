import { useState } from 'react'
import '../styles/card-list.css'
import api from '../api.js'
import Menu from './menu.jsx'
import CardList from './card-list.jsx'

const difficulty = {
  easy: 4,
  medium: 6,
  hard: 10,
};

let listLength;

const Game = () => {
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
        list.results = list.results.filter((item) => !blackList.includes(item.name));

        const randomIndices = generateRandomIndices(list.results.length, listLength - blackList.length);
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

  const clearCardList = () => {
    cardList.length = 0;
    setCardList([]);
  }

  const clearBlackList = () => {
    blackList.length = 0;
    setBlackList([]);
  };

  const gameOver = (didWin) => {
    setGameResult(`You ${didWin ? 'Won' : 'Lose'}!`);
    clearCardList();
  }

  const resetGame = () => {
    clearCardList();
    clearBlackList();
    setGameResult(null);
  }

  const setGameDifficulty = (setting) => {
    listLength = difficulty[setting];
    refreshList();
  }

  return (
    <div className="container">
      {!isLoading && !cardList.length && !gameResult ?
        <Menu setGameDifficulty={setGameDifficulty} /> :
        <div className="game">
          {isLoading ? "Loading..." :
          <>
            {gameResult ? <div>{gameResult}</div> : <CardList list={cardList} onCardClick={addToBlackList} />}
            <div>Score: {blackList.length}/{listLength}</div>
            <button className="restart" onClick={resetGame} disabled={isLoading}>Restart</button>
          </>
          }
        </div>
      }
    </div>
  );
}

export default Game;
