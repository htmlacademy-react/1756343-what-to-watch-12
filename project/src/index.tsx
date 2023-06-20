import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { login } from './store/slice-auth';
import { fetchFavorite, fetchFilms, fetchPromoFilm } from './store/slice-films';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());
store.dispatch(login());
store.dispatch(fetchFavorite());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
