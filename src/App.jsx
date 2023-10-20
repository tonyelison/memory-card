import { useState } from 'react'
import './App.css'
import api from './api.js'
import Pokemon from './components/pokemon.jsx'

function App() {
  const [randomList, setRandomList] = useState([]);

  const refreshList = () => {
    api.getList()
      .then((list) => {
        const indices = [];
        for (let i = 0; i < 10; i++) {
          indices.push(Math.floor(Math.random() * (list.count - 1)));
        }
        setRandomList(indices.map((index) => list.results[index].name));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {randomList.map((id) => <Pokemon key={id} id={id} />)}
      <button onClick={refreshList}>Refresh List</button>
    </>
  )
}

export default App
