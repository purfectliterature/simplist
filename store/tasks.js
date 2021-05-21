import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "tasks",
  initialState: {},
  reducers: {
    completed: (state, { payload }) => {
      state[payload.id].completed = true;
    },

    pending: (state, { payload }) => {
      state[payload.id].completed = false;
    },

    deleted: (state, { payload }) => {
      delete state[payload.id];
    },

    populated: (state, { payload }) => {
      for (const [id, task] of Object.entries(payload.tasks)) {
        state[id] = task;
      }
    }
  }
});

export default slice.reducer;

const { completed, pending, deleted, populated } = slice.actions;

export const completeTask = (taskId) => completed({ taskId });
export const uncompleteTask = (taskId) => pending({ taskId });
export const deleteTask = (taskId) => deleted({ taskId });
export const populateTask = (tasks) => populated({ tasks });

export const getTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks
);