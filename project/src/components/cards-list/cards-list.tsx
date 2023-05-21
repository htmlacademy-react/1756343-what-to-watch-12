import { useState } from 'react';
import { FilmsData } from '../../types/films';
import Card from '../card/card';

type CardsListProp = {
  films: FilmsData;
}

const CardsList = ({films}: CardsListProp) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <Card
            key={film.id}
            image={film.previewImage}
            title={film.name}
            id={film.id}
            setActive={setActiveCard}
          />
        ))
      }
    </div>
  );
};

export default CardsList;
