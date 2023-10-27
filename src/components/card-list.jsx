import { useState } from 'react'
import api from '../api.js'
import Pokemon from './pokemon.jsx'

const CardList = () => {
  const [cardList, setCardList] = useState([]);
  const [blackList, setBlackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
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

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const refreshList = async () => {
    setIsLoading(true)
    return await api.getList()
      .then(async (list) => {
        const randomIndices = generateRandomIndices(list.count, 10 - blackList.length);
        const newList = randomIndices.map((index) => list.results[index].name);
        
        newList.push(...blackList);
        shuffle(newList);

        const queryForEachId = () => newList.map(async (id) => await api.getById(id));

        Promise.all(queryForEachId()).then((queriedList) => {
          setCardList(queriedList);
          setIsLoading(false)
        });
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

  const renderCardList = () => {
    return cardList.map((item) => {
      const details = {
        id: item.id,
        name: item.name,
        'image-url': item.sprites['front_default'] || './public/decamark.png',
      };
      return (<Pokemon key={item.id} details={details} blackList={blackList} addToBlackList={addToBlackList} resetGame={resetGame} />)
    })
  };

  return (
    <>
      {isLoading ? <div>Loading...</div> : renderCardList()}
      <button onClick={refreshList} disabled={isLoading}>Refresh List</button>
    </>
  );
}

export default CardList;
