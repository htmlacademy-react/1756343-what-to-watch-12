import { NUMBER_OF_MOVIES_ON_HOMEPAGE } from '../../const';

type ShowButtonProp = {
  setNumbeOfMovies: React.Dispatch<React.SetStateAction<number>>;
};

const ShowButton = ({setNumbeOfMovies}: ShowButtonProp) => (
  <div className="catalog__more">
    <button
      className="catalog__button"
      type="button"
      onClick={() => setNumbeOfMovies((prev) => prev + NUMBER_OF_MOVIES_ON_HOMEPAGE)}
    >
      Show more
    </button>
  </div>
);

export default ShowButton;
