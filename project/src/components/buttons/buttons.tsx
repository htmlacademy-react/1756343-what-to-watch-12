import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { selectAuth, selectFavorite } from '../../store/selectors';
import { changeFavorite } from '../../store/slice-films';

type ButtonsProp = {
  id?: number;
}

const Buttons = ({id}: ButtonsProp) => {
  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector(selectAuth);
  const { data } = useAppSelector(selectFavorite);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(0);

  useEffect(() => {
    const isAdded = data.find((el) => el.id === id);
    if (isAdded) {
      setIsFavorite(1);
    } else {
      setIsFavorite(0);
    }
  }, [id, data]);

  const handleAddToFavorite = () => {
    if (id) {
      dispatch(changeFavorite({
        filmId: id,
        status: isFavorite ? 0 : 1,
      }));
      setIsFavorite(isFavorite ? 0 : 1);
    }
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${id || 0}`)}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      {authorizationStatus && (
        <button className="btn btn--list film-card__button" type="button" onClick={handleAddToFavorite}>
          {isFavorite === 1 ?
            <svg viewBox="0 0 18 14" width="18" height="14">
              <use xlinkHref="#in-list"></use>
            </svg> :
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>}
          <span>My list</span>
          <span className="film-card__count">{data.length}</span>
        </button>
      )}
      {authorizationStatus && window.location.pathname !== '/' && (
        <Link to={`/films/${id || 0}/review`} className="btn film-card__button">
          Add review
        </Link>
      )}
    </div>
  );
};

export default Buttons;
