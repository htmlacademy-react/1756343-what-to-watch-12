import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { authSelector } from '../../store/selectors';
import { authorization } from '../../store/slice-auth';

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector(authSelector);
  const navigate = useNavigate();

  if (authorizationStatus) {
    navigate(AppRoutes.Main);
  }

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(authorization({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={(e) => handleAuth(e)}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={emailRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );};

export default Login;
