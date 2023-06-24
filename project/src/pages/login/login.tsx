import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { AppRoutes, VALID_EMAIL, VALID_LETTERS, VALID_NUMBERS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { authSelector } from '../../store/selectors';
import { authorization } from '../../store/slice-auth';

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector(authSelector);
  const navigate = useNavigate();
  const [isValidPassword, setValidPassword] = useState(true);
  const [isValidEmail, setValidEmail] = useState(true);


  if (authorizationStatus) {
    navigate(AppRoutes.Main);
  }

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null && passwordRef.current.value.match(VALID_LETTERS) && passwordRef.current.value.match(VALID_NUMBERS)) {
      dispatch(authorization({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  const handleValidPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(VALID_LETTERS) || !e.target.value.match(VALID_NUMBERS)) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };

  const handleValidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(VALID_EMAIL)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
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
          {(!isValidPassword || !isValidEmail) && (
            <div className="sign-in__message">
              <p>Please enter a valid email address or password</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={emailRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                onChange={(e) => handleValidEmail(e)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                onChange={(e) => handleValidPassword(e)}
              />
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
