import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { FilmData, FilmsData } from '../types/films';
import { AppDispatch, InitData, RootState } from '../types/store';

const initialState: InitData = {
  genre: 'All genres',
  films: {
    data: [],
    isLoading: false,
  },
  promo: {
    data: null,
    isLoading: false,
    isError: false,
  },
  film: {
    data: null,
    isLoading: false,
    isError: false,
  },
  similarFilms: {
    data: [],
    isLoading: false,
  },
};

export const fetchFilms = createAsyncThunk<FilmsData, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmsData>('/films');
    return data;
  },
);

export const fetchPromoFilm = createAsyncThunk<FilmData, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmData>('/promo');
    return data;
  },
);

export const fetchFilm = createAsyncThunk<FilmData, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmData>(`/films/${_arg}`);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<FilmsData, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmsData>(`/films/${_arg}/similar`);
    return data;
  },
);

export const sliceFilms = createSlice({
  name: 'sliceFilms',
  initialState,
  reducers: {
    changeGenre: (state, {payload}: PayloadAction<string>) => {
      state.genre = payload;
    },
    changeErrorStatus: (state, {payload}: PayloadAction<boolean>) => {
      state.film.isError = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films.data = action.payload;
        state.films.isLoading = false;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.films.isLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promo.data = action.payload;
        state.promo.isLoading = false;
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.promo.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film.data = action.payload;
        state.film.isLoading = false;
      })
      .addCase(fetchFilm.pending, (state) => {
        state.film.isLoading = true;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.film.isError = true;
        state.film.isLoading = false;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms.data = action.payload;
        state.similarFilms.isLoading = false;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.similarFilms.isLoading = true;
      });
  }
});

export const { changeGenre, changeErrorStatus } = sliceFilms.actions;
