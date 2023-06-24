import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { deleteToken, saveToken } from '../token';
import { AppDispatch, AuthInitData, RootState } from '../types/store';
import { Auth, User } from '../types/user';

const initialState: AuthInitData = {
  authorizationStatus: null,
  user: {
    avatarUrl: '',
    email: '',
    id: 0,
    name: '',
    token: '',
  },
};


export const login = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<User>('/login');
    return data;
  },
);

export const authorization = createAsyncThunk<User, Auth, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/authorization',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>('/login', {email, password});

    if (data.token) {
      saveToken(data.token);
    }
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    deleteToken();
  },
);

export const sliceAuth = createSlice({
  name: 'sliceAuth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = false;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.authorizationStatus = true;
        state.user = action.payload;
      })
      .addCase(authorization.rejected, (state) => {
        state.authorizationStatus = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = false;
      });
  }
});
