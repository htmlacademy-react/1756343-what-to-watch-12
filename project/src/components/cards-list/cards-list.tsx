import { FilmsData } from '../../types/films';
import Card from '../card/card';

type CardsListProp = {
  films: FilmsData;
}

const CardsList = ({films}: CardsListProp) => (
  <div className="catalog__films-list">
    {
      films.map((film) => (
        <Card
          key={film.id}
          image={film.previewImage}
          title={film.name}
          id={film.id}
          video={film.previewVideoLink}
        />
      ))
    }
  </div>
);

export default CardsList;
