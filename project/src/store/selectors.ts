import { RootState } from '../types/store';

export const genreSelector = (state: RootState) => state.films.genre;
export const filmsSelector = (state: RootState) => state.films.films;
export const promoSelector = (state: RootState) => state.films.promo;
export const filmSelector = (state: RootState) => state.films.film;
export const similarSelector = (state: RootState) => state.films.similarFilms;
export const authSelector = (state: RootState) => state.auth;
export const reviewsSelector = (state: RootState) => state.reviews;
