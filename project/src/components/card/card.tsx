import { Link } from 'react-router-dom';

type CardProp = {
  image: string;
  title: string;
  id: number;
  setActive: React.Dispatch<React.SetStateAction<number | null>>;
};

const Card = ({image, title, id, setActive}: CardProp) => (
  <article
    className="small-film-card catalog__films-card"
    onMouseEnter={() => setActive(id)}
    onMouseLeave={() => setActive(null)}
  >
    <div className="small-film-card__image">
      <img src={image} alt={title} width="280" height="175" />
    </div>
    <h3 className="small-film-card__title">
      <Link to={`films/${id}`} className="small-film-card__link">{title}</Link>
    </h3>
  </article>
);

export default Card;
