import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { postReducer } from "./posts/postSlice"

import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";

const postPersistConfig = {
  key: "post",
  storage: storage,
  whitelist: ["category"],
}


export const store = configureStore({
  reducer: {
    post: persistReducer(postPersistConfig, postReducer)
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

