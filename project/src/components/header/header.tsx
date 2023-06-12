import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { authSelector } from '../../store/selectors';
import { logout } from '../../store/slice-auth';
import Logo from '../logo/logo';

const Header = () => {
  const dispatch = useAppDispatch();
  const {authorizationStatus, user} = useAppSelector(authSelector);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="page-header film-card__head">
      <Logo />
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

  );
};

export default Header;
