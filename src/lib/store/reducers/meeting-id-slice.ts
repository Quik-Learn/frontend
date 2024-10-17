import { createSlice } from '@reduxjs/toolkit';

const initialState = '';
const meetingIdSlice = createSlice({
  name: 'meetingId',
  initialState,
  reducers: {
    setMeetingId: (state, { payload }) => {
      return payload;
    },
    clearMeetingId: () => {
      return '';
    },
  },
});

const { reducer, actions } = meetingIdSlice;
export const { setMeetingId, clearMeetingId } = actions;
export default reducer;
export const meetingIdState = (state: any) => state.app.meetingId;
