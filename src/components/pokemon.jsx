import { useState, useEffect } from 'react'
import api from '../api.js'

const Pokemon = ({ id }) => {
  const [details, setDetails] = useState('');

  useEffect(() => {
    api.getById(id)
      .then((response) => {
        setDetails({
          name: response.name,
          'image-url': response.sprites['front_default'],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div>{details.name}</div>
      <img src={details['image-url']} />
    </>
  );
}

export default Pokemon;