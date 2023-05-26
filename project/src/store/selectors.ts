import { RootState } from '../types/store';

export const genreSelector = (state: RootState) => state.films.genre;
export const filmsSelector = (state: RootState) => state.films.filmsList;
