import '../styles/pokemon.css'
import humanize from '../util/humanize.js'

const Pokemon = ({ details, blackList, addToBlackList, resetGame }) => {
  const didClickCard = () => {
    blackList.includes(details.name) ? resetGame() : addToBlackList(details.name);
  };

  return (
    <div className='pokemon-card' onClick={didClickCard}>
      <div>{humanize(details.name)}</div>
      <img src={details['image-url']} />
    </div>
  );
}

export default Pokemon;