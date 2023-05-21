import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { activeFilm, films } from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App films={films} activeFilm={activeFilm} />
  </React.StrictMode>,
);
