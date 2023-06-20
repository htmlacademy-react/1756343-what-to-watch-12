import { setRating } from '../../helpers/set-rating';
import { FilmData } from '../../types/films';

type OverviewProp = {
  film: FilmData | null;
};

const Overview = ({film}: OverviewProp) => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{film?.rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">
          {setRating(film?.rating)}
        </span>
        <span className="film-rating__count">{film?.scoresCount} ratings</span>
      </p>
    </div>
    <div className="film-card__text">
      <p>{film?.description}</p>
      <p className="film-card__director"><strong>Director: {film?.director}</strong></p>
      <p className="film-card__starring"><strong>Starring: {film?.starring.join(', ')} and other</strong></p>
    </div>
  </>
);

export default Overview;
