import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "tasks",
  initialState: {
    content: {}
  },
  reducers: {
    completed: (state, { payload }) => {
      state.content[payload.id].completed = true;
    },

    pending: (state, { payload }) => {
      state.content[payload.id].completed = false;
    },

    deleted: (state, { payload }) => {
      delete state.content[payload.id];
    },

    populated: (state, { payload }) => {
      // for (const [id, task] of Object.entries(payload.tasks)) {
      //   state[id] = task;
      // }
      state.content = payload.tasks;
    },

    reset: (state) => {
      Object.keys(state).forEach((item) => delete state[item]);
      state.content = {};
    }
  }
});

export default slice.reducer;

const { completed, pending, deleted, populated, reset } = slice.actions;

export const completeTask = (taskId) => completed({ taskId });
export const uncompleteTask = (taskId) => pending({ taskId });
export const deleteTask = (taskId) => deleted({ taskId });
export const populateTask = (tasks) => populated({ tasks });
export const resetTasks = () => reset();

export const getTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.content
);