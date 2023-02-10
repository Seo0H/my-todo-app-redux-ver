import { getTodosApi } from "../lib/api/todo";
import { createTodoApi } from "./../lib/api/todo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

/* todo action type */
const GET_TODOS = "todo/GET_TODOS";
const TODO_CREATE = "todo/TODO_CREATE";
const TODO_REMOVE = "todo/TODO_REMOVE";
const TODO_MODIFY = "todo/TODO_MODIFY";
const TODO_FINISH = "todo/TODO_FINISH";
const TODO_STATE = "todo/TODO_STATE";
const CHANGE_MODIFY_INPUT = "todo/CHANGE_MODIFY_INPUT";
const CREATE_TODO = "todo/CREATE_TODO";

/* todo reducer */
export const getTodos = createAsyncThunk(GET_TODOS, async () =>
  getTodosApi().then((res) => res.data)
);

// export const todoCreate = createAction(TODO_CREATE, (text) => text);
// export const todoRemove = createAction(TODO_REMOVE, (id) => id);
// export const todoModify = createAction(TODO_MODIFY, (id, modifyVal) => ({
//   id,
//   modifyVal,
// }));
// export const todoFinish = createAction(TODO_FINISH, (id) => id);
// export const todoState = createAction(TODO_STATE);

const initialState = { todos: [], status: "" };

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    todoCreate: (todos, { payload: todo }) => {
      createTodoApi(todo)
        .then((res) => {
          console.log(res.data);
          console.log("전송완료");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    todoRemove: (todos, { payload: id }) =>
      todos.filter((todo) => todo.id !== id),
    todoModify: (todos, { payload: { id, modifyVal } }) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: modifyVal } : todo
      ),
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
    builder.addCase(getTodos.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(getTodos.fulfilled, (state, { payload: todos }) => {
      todos.map((todo) => (state.todos.push(todo)));
      state.status = "COMPLETE";
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.status = "FAIL";
    });
  },
});

export default todoSlice;
export const { todoCreate, todoRemove, todoModify, todoFinish, todoState } =
  todoSlice.actions;
// export { asyncUp, asyncUpFetch };
