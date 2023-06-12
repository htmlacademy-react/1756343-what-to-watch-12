import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { authSelector, filmsSelector } from '../../store/selectors';
import { logout } from '../../store/slice-auth';

const Review = () => {
  const {id} = useParams();
  const {data} = useAppSelector(filmsSelector);
  const dispatch = useAppDispatch();
  const {authorizationStatus, user} = useAppSelector(authSelector);

  const film = data.find((f) => f.id === Number(id));

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

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
          {authorizationStatus ? (
            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link className="user-block__link" to="/" onClick={(e) => handleLogout(e)}>Sign out</Link>
              </li>
            </ul>
          ) : (
            <ul className="user-block">
              <li className="user-block__item">
                <Link to={AppRoutes.Login} className="user-block__link">Sign in</Link>
              </li>
            </ul>
          )}
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
