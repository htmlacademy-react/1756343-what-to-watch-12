import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Buttons from '../../components/buttons/buttons';
import CardsList from '../../components/cards-list/cards-list';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import Tabs from '../../components/tabs/tabs';
import { AppRoutes, NUMBER_OF_SIMILAR_MOVIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { filmSelector, similarSelector } from '../../store/selectors';
import { changeErrorStatus, fetchFilm, fetchSimilarFilms } from '../../store/slice-films';
import { fetchReviews } from '../../store/slice-reviews';
import { store } from '../../store/store';

const Film = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {data, isError} = useAppSelector(filmSelector);
  const {data: similar} = useAppSelector(similarSelector);
  const { pathname } = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
      dispatch(fetchSimilarFilms(id));
      dispatch(fetchReviews(id));

    }
  }, [id, dispatch]);

  if (isError) {
    store.dispatch(changeErrorStatus(false));
    navigate(AppRoutes.NotFound);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: data?.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={data?.backgroundImage} alt={data?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo />
            <Header />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{data?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{data?.genre}</span>
                <span className="film-card__year">{data?.released}</span>
              </p>
              <Buttons id={data?.id} />
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={data?.posterImage} alt={data?.name} width="218" height="327" />
            </div>
            <Tabs film={data} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <CardsList films={similar} quantity={NUMBER_OF_SIMILAR_MOVIES} />
        </section>

        <footer className="page-footer">
          <Logo cn='logo__link--light' />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Film;
