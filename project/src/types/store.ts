import { store } from '../store/store';
import { FilmData, FilmsData } from './films';
import { User } from './user';

export type FilmInitData = {
  data: FilmData | null;
  isLoading: boolean;
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
};

export type AuthInitData = {
  authorizationStatus: boolean;
  user: User;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
