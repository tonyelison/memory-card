import '../styles/card.css'
import humanize from '../util/humanize.js'
import decamarkSrc from '../assets/decamark.png'

const Card = ({ details, onClickHandler }) => {
  return (
    <div className='card' onClick={() => onClickHandler(details.name)}>
      <div className='name'>{humanize(details.name)}</div>
      <img src={details['image-url'] || decamarkSrc} />
    </div>
  );
}

export default Card;