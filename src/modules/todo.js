import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { useRef } from "react";
import { getTodosApi } from "../lib/api/todo";
import { createTodoApi } from "./../lib/api/todo";

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
export const getTodos = createAction(GET_TODOS); // -> 구현중
export const todoCreate = createAction(TODO_CREATE, (text) => text);
export const todoRemove = createAction(TODO_REMOVE, (id) => id);
export const todoModify = createAction(TODO_MODIFY, (id, modifyVal) => ({
  id,
  modifyVal,
}));
export const todoFinish = createAction(TODO_FINISH, (id) => id);
export const todoState = createAction(TODO_STATE);

// export const changeModifyInput = createAction(
//   CHANGE_MODIFY_INPUT,
//   (form) => (
//     )
// );
const userId = localStorage.getItem("User_id");

let nextID = 3;
const initialState = [
  // {
  //   id: 1,
  //   todo: "todo1",
  //   isCompleted: false,
  //   userId: 1,
  // },
  // {
  //   id: 2,
  //   todo: "todo2",
  //   isCompleted: false,
  //   userId: 1,
  // },
];

// const response = async () =>
//       await api.get("/todos").then(({ data }) => setTodoList([...data]));

const todoReducer = handleActions(
  {
    [GET_TODOS]: (todos) => {
      // console.log
      // getTodosApi()
      // .then(({ data }) => {
      //   todos = [...data];
      // })
      // .catch((err) => console.log(err.response.data.message));
    },
    [TODO_CREATE]: (todos, { payload: todo }) => {
      createTodoApi(todo)
        .then((res) => {
          console.log(res.data);
          console.log("전송완료");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    [TODO_REMOVE]: (todos, { payload: id }) =>
      todos.filter((todo) => todo.id !== id),
    [TODO_MODIFY]: (todos, { payload: { id, modifyVal } }) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: modifyVal } : todo
      ),
    [TODO_FINISH]: (todos, { payload: id }) => {
      todos.map((todo) => {
        return todo.id == id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      });
    },
    [TODO_STATE]: (todos) => {
      return todos;
    },
    [CHANGE_MODIFY_INPUT]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
  },
  initialState
);

export default todoReducer;
