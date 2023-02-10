import { deleteTodoApi, getTodosApi, updateTodoApi } from "../lib/api/todo";
import { createTodoApi } from "./../lib/api/todo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* todo action type */
const GET_TODOS = "todo/GET_TODOS";
const TODO_CREATE = "todo/TODO_CREATE";
const TODO_REMOVE = "todo/TODO_REMOVE";
const TODO_UPDATE = "todo/TODO_UPDATE";
const CHANGE_MODIFY_INPUT = "todo/CHANGE_MODIFY_INPUT";


/* todo Thunk Action */
export const getTodos = createAsyncThunk(GET_TODOS, async () =>
  getTodosApi().then((res) => res.data)
);
export const todoRemove = createAsyncThunk(TODO_REMOVE, async (id) =>
  deleteTodoApi(id)
);
export const todoCreate = createAsyncThunk(TODO_CREATE, async (text) =>
  createTodoApi(text)
);
export const todoUpdate = createAsyncThunk(
  TODO_UPDATE,
  async ({id, todo, isCompleted}) => updateTodoApi(id, todo, isCompleted)
);

const initialState = { todos: [], status: "" };

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    todoFinish: (todos, { payload: id }) => {
      todos.map((todo) => {
        return todo.id == id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      });
    },
    todoState: (todos) => {
      return todos;
    },
  },
  extraReducers: (builder) => {
    /* getTodos Thunk Reducer */
    builder.addCase(getTodos.pending, (state) => {
      state.status = "LOADING";
    });
    builder.addCase(getTodos.fulfilled, (state, { payload: todos }) => {
      // todos.map((todo) => (state.todos.push(todo)));
      state.todos = [...todos];
      state.status = "COMPLETE";
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.status = "FAIL";
    });

    /* todoRemove Thunk Reducer */
    builder.addCase(todoRemove.pending, (state) => {
      state.status = "LOADING";
    });
    builder.addCase(
      todoRemove.fulfilled,
      ({ todos, state }, { payload: id }) => {
        todos.filter((todo) => todo.id !== id);
        state = "COMPLETE";
      }
    );
    builder.addCase(todoRemove.rejected, (state) => {
      state.status = "FAIL";
    });

    /* todoCreate Thunk Reducer */
    builder.addCase(todoCreate.pending, (state) => {
      state.status = "LOADING";
    });
    builder.addCase(todoCreate.fulfilled, (state) => {
      state.status = "COMPLETE";
    });
    builder.addCase(todoCreate.rejected, (state) => {
      state.status = "FAIL";
    });

    /* todoUpdate Thunk Reducer */
    builder.addCase(todoUpdate.pending, (state, ) => {
      state.status = "LOADING";
    });
    builder.addCase(todoUpdate.fulfilled, (state) => {
      state.status = "COMPLETE";
    });
    builder.addCase(todoUpdate.rejected, (state) => {
      state.status = "FAIL";
    });
  },
});

export default todoSlice;
export const { todoFinish, todoState } = todoSlice.actions;
