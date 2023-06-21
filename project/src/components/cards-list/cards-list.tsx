import { FilmsData } from '../../types/films';
import Card from '../card/card';

type CardsListProp = {
  films: FilmsData;
  quantity: number;
}

const CardsList = ({films, quantity}: CardsListProp) => (
  <div className="catalog__films-list">
    {
      films.map((film, i) => (i < quantity
        ? (
          <Card
            key={film.id}
            image={film.previewImage}
            title={film.name}
            id={film.id}
            video={film.previewVideoLink}
          />
        )
        : null))
    }
  </div>
);

export default CardsList;
