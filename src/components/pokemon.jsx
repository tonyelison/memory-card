import { useState, useEffect } from 'react'
import api from '../api.js'

function Pokemon({ id }) {
  const [result, setResult] = useState('');

  useEffect(() => {
    api.getById(id)
      .then((response) => {
        setResult({
          name: response.name,
          'image-url': response.sprites['front_default'],
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }, [id]);

  return (
    <>
      <div>{result.name}</div>
      <img src={result['image-url']} />
    </>
  )
}

export default Pokemon;