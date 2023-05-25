import { useState } from 'react';
import { FILM_NAV } from '../../const';
import { FilmData } from '../../types/films';
import Details from '../details/details';
import Overview from '../overview/overview';
import Reviews from '../reviews/reviews';

type TabsProp = {
  film: FilmData | undefined;
}

const Tabs = ({film}: TabsProp) => {
  const [state, setState] = useState('Overview');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (state === target.innerText) {
      return;
    }
    setState(target.innerText);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {FILM_NAV.map((nav) => (
            <li className={`film-nav__item ${nav === state ? 'film-nav__item--active' : ''}`} key={nav}>
              <a href="/" className="film-nav__link" onClick={(e) => handleClick(e)}>{nav}</a>
            </li>
          ))}
        </ul>
      </nav>
      {state === 'Overview' && <Overview film={film} />}
      {state === 'Details' && <Details film={film} />}
      {state === 'Reviews' && <Reviews />}
    </div>
  );
};

export default Tabs;
