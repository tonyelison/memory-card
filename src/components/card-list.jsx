import Card from './card.jsx'

const CardList = ({ list, onCardClick }) => {
  return (
  <>
    <div className="card-list">
      {list.map((item) => {
        const details = {
          id: item.id,
          name: item.name,
          'image-url': item.sprites['front_default'] || './public/decamark.png',
        };
        return (<Card key={item.id} details={details} onClickHandler={onCardClick} />)
      })}
    </div>
  </>);
};

export default CardList;