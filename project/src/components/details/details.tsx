import { getRunTime } from '../../helpers/get-run-time';
import { FilmData } from '../../types/films';

type DetailsProp = {
  film: FilmData | null;
};

const Details = ({film}: DetailsProp) => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{film?.director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {film?.starring.map((star) => <span key={star}>{star}<br/></span>)}
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{getRunTime(film?.runTime as number)}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{film?.genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{film?.released}</span>
      </p>
    </div>
  </div>
);

export default Details;
