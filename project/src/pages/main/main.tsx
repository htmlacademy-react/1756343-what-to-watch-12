import { useEffect, useMemo, useState } from 'react';
import Buttons from '../../components/buttons/buttons';
import CardsList from '../../components/cards-list/cards-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import ShowButton from '../../components/show-button/show-button';
import Spinner from '../../components/spinner/spinner';
import { NUMBER_OF_MOVIES_ON_HOMEPAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { selectFilms, selectGenre, selectPromo } from '../../store/selectors';
import { changeGenre } from '../../store/slice-films';

const Main = () => {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(selectGenre);
  const films = useAppSelector(selectFilms);
  const promo = useAppSelector(selectPromo);
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
    setNumbeOfMovies(NUMBER_OF_MOVIES_ON_HOMEPAGE);
    dispatch(changeGenre(target.innerText));
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo.data?.backgroundImage} alt={promo.data?.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <Header />
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
              <Buttons id={promo.data?.id} />
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
