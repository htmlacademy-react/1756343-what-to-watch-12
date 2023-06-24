import { RootState } from '../types/store';

export const selectGenre = (state: RootState) => state.films.genre;
export const selectFilms = (state: RootState) => state.films.films;
export const selectPromo = (state: RootState) => state.films.promo;
export const selectFilm = (state: RootState) => state.films.film;
export const selectSimilarFilms = (state: RootState) => state.films.similarFilms;
export const selectAuth = (state: RootState) => state.auth;
export const selectReviews = (state: RootState) => state.reviews;
export const selectFavorite = (state: RootState) => state.films.favorite;
