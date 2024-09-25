import { createSlice } from '@reduxjs/toolkit';

const initialState = 'student';
const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setType: (state, { payload }) => {
      return payload;
    },
    clearType: () => {
      return '';
    },
  },
});

const { reducer, actions } = typeSlice;
export const { setType, clearType } = actions;
export default reducer;
export const typeState = (state: any) => state.app.type;
