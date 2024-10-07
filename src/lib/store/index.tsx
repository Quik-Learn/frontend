import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// services

// reducers
import tokenReducer from './reducers/token-slice';
import userReducer from './reducers/user-slice';
import uiReducer from './reducers/ui-slice';
import typeReducer from './reducers/type-slice';
import { authService } from '../services/auth-service';
import { userService } from '../services/user-service';
import { parentService } from '../services/parent-mutation';
import { studentService } from '../services/student-mutation';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'user', 'ui', 'type'],
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  ui: uiReducer,
  type: typeReducer,
  [authService.reducerPath]: authService.reducer,
  [userService.reducerPath]: userService.reducer,
  [parentService.reducerPath]: parentService.reducer,
  [studentService.reducerPath]: studentService.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: {
    app: persistedReducer,
    [authService.reducerPath]: authService.reducer,
    [userService.reducerPath]: userService.reducer,
    [parentService.reducerPath]: parentService.reducer,
    [studentService.reducerPath]: studentService.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authService.middleware,
      userService.middleware,
      parentService.middleware,
      studentService.middleware,
    ]),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
