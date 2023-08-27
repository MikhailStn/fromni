import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import headerSlice from "../store/headerSlice";
import currentUserSlice from "../store/currentUserSlice";
import registrationInputSlice from "../store/registrationInputSlice";
import channelSlice from "../store/currentChannel";

const rootReducer = combineReducers({
  headerNav: headerSlice,
  currentUser: currentUserSlice,
  reg: registrationInputSlice,
  channel: channelSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
