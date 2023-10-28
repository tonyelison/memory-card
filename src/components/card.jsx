import '../styles/card.css'
import humanize from '../util/humanize.js'

const Card = ({ details, onClickHandler }) => {
  return (
    <div className='card' onClick={() => onClickHandler(details.name)}>
      <div className='name'>{humanize(details.name)}</div>
      <img src={details['image-url'] || './src/assets/decamark.png'} />
    </div>
  );
}

export default Card;