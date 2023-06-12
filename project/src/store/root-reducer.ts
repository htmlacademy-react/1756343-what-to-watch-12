import { combineReducers } from '@reduxjs/toolkit';
import { sliceAuth } from './slice-auth';
import { sliceFilms } from './slice-films';

export const rootReducer = combineReducers({
  films: sliceFilms.reducer,
  auth: sliceAuth.reducer,
});
