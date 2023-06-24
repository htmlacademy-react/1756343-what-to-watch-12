import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { STATUS } from '../const';
import { NewReview, Reviews } from '../types/review';
import { AppDispatch, ReviewsInitData, RootState } from '../types/store';

const initialState: ReviewsInitData = {
  reviews: [],
  status: '',
};

export const fetchReviews = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/fetchReviews',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`/comments/${_arg}`);
    return data;
  },
);

export const sendReview = createAsyncThunk<Reviews, NewReview, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/sendReview',
  async ({comment, rating, hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`/comments/${hotelId}`, {comment, rating});
    return data;
  },
);

export const sliceReviews = createSlice({
  name: 'sliceReviews',
  initialState,
  reducers: {
    changeStatus: (state) => {
      state.status = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = STATUS.Success;

      })
      .addCase(sendReview.pending, (state, action) => {
        state.status = STATUS.Loading;
      })
      .addCase(sendReview.rejected, (state, action) => {
        state.status = STATUS.Error;
      });
  }
});

export const { changeStatus } = sliceReviews.actions;

