import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodosApi } from "../lib/api/todo";

/* todo action type */

const GET_TODOS = "todo/GET_TODOS";

const initialState = [];

/* todo thunk reducer */

export const getTodos = createAsyncThunk(GET_TODOS, () => {
  const res = getTodosApi();
  return res;
});

const todoSlice = createSlice({
  name: GET_TODOS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "COMPLETE";
    });
    builder.addCase(asyncUpFetch.rejected, (state, action) => {
      state.status = "FAIL";
    });
  },
});
