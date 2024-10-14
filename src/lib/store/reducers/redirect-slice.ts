import { createSlice } from '@reduxjs/toolkit';

const initialState = '';
const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirect: (state, { payload }) => {
      return payload;
    },
    clearRedirect: () => {
      return '';
    },
  },
});

const { reducer, actions } = redirectSlice;
export const { setRedirect, clearRedirect } = actions;
export default reducer;
export const redirectState = (state: any) => state.app.redirect;
