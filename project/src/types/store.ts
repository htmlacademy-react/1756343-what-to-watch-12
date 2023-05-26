import { store } from '../store/store';
import { FilmsData } from './films';

export type FilmsInitData = {
  genre: string;
  filmsList: FilmsData;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
