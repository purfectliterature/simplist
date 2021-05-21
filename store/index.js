import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./tasks";

export default () => {
  const store = configureStore({
    reducer: combineReducers({
      tasks: tasksReducer
    }),
    middleware: [
      store => next => action => {
        const x = next(action);
        console.log("middleware", store.getState());
      }
    ]
  })

  return { store };
}