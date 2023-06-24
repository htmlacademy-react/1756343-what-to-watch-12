import { store } from '../store/store';
import { FilmData, FilmsData } from './films';
import { Reviews } from './review';
import { User } from './user';

export type FilmInitData = {
  data: FilmData | null;
  isLoading: boolean;
  isError: boolean;
};

export type FilmsInitData = {
  data: FilmsData;
  isLoading: boolean;
};

export type InitData = {
  genre: string;
  films: FilmsInitData;
  promo: FilmInitData;
  film: FilmInitData;
  similarFilms: FilmsInitData;
  favorite: FilmsInitData;
};

export type AuthInitData = {
  authorizationStatus: boolean | null;
  user: User;
};

export type ReviewsInitData = {
  reviews: Reviews | [];
  status: string;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
