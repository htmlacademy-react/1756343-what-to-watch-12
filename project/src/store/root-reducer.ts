import { combineReducers } from '@reduxjs/toolkit';
import { sliceFilms } from './slice-films';

export const rootReducer = combineReducers({
  films: sliceFilms.reducer,
});
