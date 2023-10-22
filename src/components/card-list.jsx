import { useState } from 'react'
import api from '../api.js'
import Pokemon from './pokemon.jsx'

const CardList = () => {
  const [randomList, setRandomList] = useState([]);
  const [blackList, setBlackList] = useState([]);
  
  const generateRandomIndices = (max) => {
    const indices = [...blackList];
    while (indices.length <= 10) {
      const randomInt = Math.floor(Math.random() * (max - 1));
      if (!indices.includes(randomInt)) {
        indices.push(randomInt);
      }
    }
    return indices;
  };

  function refreshList() {
    api.getList()
      .then((list) => {
        setRandomList(generateRandomIndices(list.count).map((index) => list.results[index].name));
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {randomList.map((id) => <Pokemon key={id} id={id} blackList={blackList} setBlackList={setBlackList} refreshList={refreshList} />)}
      <button onClick={refreshList}>Refresh List</button>
    </>
  );
}

export default CardList;
