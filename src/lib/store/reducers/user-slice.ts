import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      return payload;
    },
    clearUser: () => {
      return {};
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, clearUser } = actions;
export default reducer;
export const userState = (state: any) => state.user;
