import '../styles/card.css'
import humanize from '../util/humanize.js'

const Card = ({ details, blackList, addToBlackList, gameOver }) => {
  const didClickCard = () => {
    blackList.includes(details.name) ? gameOver() : addToBlackList(details.name);
  };

  return (
    <div className='card' onClick={didClickCard}>
      <div className='name'>{humanize(details.name)}</div>
      <img src={details['image-url']} />
    </div>
  );
}

export default Card;