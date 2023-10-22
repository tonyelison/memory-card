import '../styles/pokemon.css'
import { useState, useEffect } from 'react'
import api from '../api.js'
import humanize from '../util/humanize.js'

const Pokemon = ({ id, blackList, setBlackList, refreshList }) => {
  const [details, setDetails] = useState('');

  useEffect(() => {
    api.getById(id)
      .then((response) => {
        setDetails({
          id: response.id,
          name: response.name,
          'image-url': response.sprites['front_default'],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const didClickCard = () => {
    if (blackList.includes(details.id)) {
      console.log('you lose');
      return;
    }
    blackList.push(details.id);
    setBlackList([...blackList]);
    refreshList();
  };

  return (
    <div className='pokemon-card' onClick={didClickCard}>
      <div>{humanize(details.name)}</div>
      <img src={details['image-url']} />
    </div>
  );
}

export default Pokemon;