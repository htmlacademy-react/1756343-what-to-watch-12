import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import { useAppSelector } from '../../hooks/use-redux';
import { filmsSelector } from '../../store/selectors';

const Review = () => {
  const {id} = useParams();
  const {data} = useAppSelector(filmsSelector);

  const film = data.find((f) => f.id === Number(id));

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film?.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film?.id || 0}`} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a href='/' className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <Header />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={`${film?.name || 0} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
};

export default Review;
