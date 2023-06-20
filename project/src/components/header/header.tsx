import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { authSelector } from '../../store/selectors';
import { logout } from '../../store/slice-auth';

const Header = () => {
  const dispatch = useAppDispatch();
  const {authorizationStatus, user} = useAppSelector(authSelector);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <ul className="user-block">
      {authorizationStatus ? (
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to={AppRoutes.MyList}>
                <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </li>
          <li className="user-block__item">
            <Link className="user-block__link" to="/" onClick={(e) => handleLogout(e)}>Sign out</Link>
          </li>
        </>
      ) : (
        <li className="user-block__item">
          <Link to={AppRoutes.Login} className="user-block__link">Sign in</Link>
        </li>
      )}
    </ul>
  );
};

export default Header;
