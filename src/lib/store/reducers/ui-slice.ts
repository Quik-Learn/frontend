import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SuccessState {
  open: boolean;
  title: string;
  description: string;
  buttonText: string;
}

interface UIState {
  isSuccess: SuccessState;
}

const initialState: UIState = {
  isSuccess: {
    open: false,
    title: '',
    description: '',
    buttonText: '',
  },
};

interface SetSuccessPayload {
  open: boolean;
  title: string;
  description: string;
  buttonText: string;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSuccess: (state, action: PayloadAction<SetSuccessPayload>) => {
      state.isSuccess = action.payload;
    },
    clearSuccess: (state) => {
      state.isSuccess = {
        open: false,
        title: '',
        description: '',
        buttonText: '',
      };
    },
  },
});

const { reducer, actions } = uiSlice;
export const { setSuccess, clearSuccess } = actions;
export default reducer;

// Selector to access UI state
export const uiState = (state: { app: { ui: UIState } }) => state.app.ui;
