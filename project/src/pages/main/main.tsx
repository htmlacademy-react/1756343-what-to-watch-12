import { useEffect, useMemo, useState } from 'react';
import CardsList from '../../components/cards-list/cards-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import ShowButton from '../../components/show-button/show-button';
import Spinner from '../../components/spinner/spinner';
import { NUMBER_OF_MOVIES_ON_HOMEPAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { filmsSelector, genreSelector, promoSelector } from '../../store/selectors';
import { changeGenre } from '../../store/slice-films';

const Main = () => {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(genreSelector);
  const films = useAppSelector(filmsSelector);
  const promo = useAppSelector(promoSelector);
  const [genresList, setGenresList] = useState<string[]>([]);
  const [numbeOfMovies, setNumbeOfMovies] = useState(NUMBER_OF_MOVIES_ON_HOMEPAGE);

  useEffect(() => {
    const genres: string[] = ['All genres'];
    films.data.forEach((film) => {
      if (!genres.includes(film.genre)) {
        genres.push(film.genre);
      }
    });
    setGenresList([...genres]);
  }, [films]);

  const filteredFilms = useMemo(() => {
    const filtered = films.data.filter((film) => film.genre === activeGenre);
    if (filtered.length) {
      return filtered;
    } else {
      return films.data;
    }
  }, [films, activeGenre]);

  const handleChangeGenre = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (activeGenre === target.innerText) {
      return;
    }
    dispatch(changeGenre(target.innerText));
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a href='/' className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo.data?.posterImage} alt={promo.data?.name} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promo.data?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo.data?.genre}</span>
                <span className="film-card__year">{promo.data?.released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {films.isLoading
            ? <Spinner />
            : (
              <>
                <GenresList genres={genresList} activeGenre={activeGenre} changeGenre={handleChangeGenre} />
                <CardsList films={filteredFilms} quantity={numbeOfMovies} />
                {numbeOfMovies < filteredFilms.length && <ShowButton setNumbeOfMovies={setNumbeOfMovies} />}
              </>
            )}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Main;
