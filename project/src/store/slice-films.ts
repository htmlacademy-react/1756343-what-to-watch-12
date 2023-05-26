import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { FilmsInitData } from '../types/store';

const initialState: FilmsInitData = {
  genre: 'All genres',
  filmsList: []
};

export const sliceFilms = createSlice({
  name: 'sliceFilms',
  initialState,
  reducers: {
    setFilms: (state) => {
      state.filmsList = films;
    },
    changeGenre: (state, {payload}: PayloadAction<string>) => {
      state.genre = payload;
    }
  }
});

export const { setFilms, changeGenre } = sliceFilms.actions;
