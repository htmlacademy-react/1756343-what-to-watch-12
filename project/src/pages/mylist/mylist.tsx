import { Link } from 'react-router-dom';
import CardsList from '../../components/cards-list/cards-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { AppRoutes } from '../../const';
import { FilmsData } from '../../types/films';

type MyListProp = {
  films: FilmsData;
};

const MyList = ({films}: MyListProp) => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <Logo />
      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link to={AppRoutes.Login} className="user-block__link">Sign out</Link>
        </li>
      </ul>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <CardsList films={films} />
    </section>
    <Footer />
  </div>
);

export default MyList;
