import { useState } from 'react'
import api from '../api.js'
import Pokemon from './pokemon.jsx'

const CardList = () => {
  const [shuffledList, setShuffledList] = useState([]);
  const [blackList, setBlackList] = useState([]);

  const randomInt = (max) => Math.floor(Math.random() * max);
  
  const generateRandomIndices = (max, length) => {
    const indices = [];
    while (indices.length <= length) {
      const newIndex = randomInt(max - 1);
      if (!indices.includes(newIndex)) {
        indices.push(newIndex);
      }
    }
    return indices;
  };

  const shuffleList = (list) => {
    for (let i = list.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [list[i], list[j]] = [list[j], list[i]];
    }
  };

  const refreshList = async () => {
    return await api.getList()
      .then((list) => {
        const randomIndices = generateRandomIndices(list.count, 10 - blackList.length);
        const newList = randomIndices.map((index) => list.results[index].name);
        
        newList.push(...blackList);
        shuffleList(newList);
        setShuffledList(newList);
      })
      .catch((error) => console.log(error));
  }

  function addToBlackList(id) {
    blackList.push(id);
    setBlackList([...blackList]);
    refreshList();
  }

  function resetGame() {
    console.log('you lose');
    blackList.length = 0;
    setBlackList([]);
    refreshList().then(() => {
      console.log('game reset!');
    });
  }

  return (
    <>
      {shuffledList.map((id) => <Pokemon key={id} id={id} blackList={blackList} addToBlackList={addToBlackList} resetGame={resetGame} />)}
      <button onClick={refreshList}>Refresh List</button>
    </>
  );
}

export default CardList;
