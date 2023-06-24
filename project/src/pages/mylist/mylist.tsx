import { useEffect } from 'react';
import CardsList from '../../components/cards-list/cards-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { selectFavorite } from '../../store/selectors';
import { fetchFavorite } from '../../store/slice-films';

const MyList = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectFavorite);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{data.length}</span></h1>
        <Header />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <CardsList films={data} quantity={data.length} />
      </section>
      <Footer />
    </div>
  );
};

export default MyList;
