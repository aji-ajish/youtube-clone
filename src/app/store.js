import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "../slices/useSlice";

const reducer = combineReducers({
  userInfo: useReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
