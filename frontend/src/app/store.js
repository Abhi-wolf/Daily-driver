import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import userSlice from "./features/userSlice";
import eventSlice from "./features/eventsSlice";
import { userApi } from "./features/userApi";

// 1. Define the persist config for the slices you want to persist
const persistConfig = {
  key: "root", // Key for localStorage (you can customize this)
  storage: storageSession, // Default storage is localStorage for the web
  whitelist: ["user", "events"], // Only the user and event slice will be persisted
  stateReconciler: hardSet,
};

// 2. Combine all reducers
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  user: userSlice,
  events: eventSlice,
  // folder: folderSlice, // Uncomment if you want to use folderSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
