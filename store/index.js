import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import tasksReducer from "./tasks";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
}

export default () => {
  const store = configureStore({
    reducer: persistReducer(persistConfig, combineReducers({
      tasks: tasksReducer
    })),
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }),
      store => next => action => {
        next(action);
        console.log("middleware", store.getState());
      }
    ]
  });

  const persistor = persistStore(store);

  return { store, persistor };
}