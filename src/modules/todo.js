import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { useRef } from "react";

/* todo action type */
const TODO_CREATE = "todo/TODO_CREATE";
const TODO_REMOVE = "todo/TODO_REMOVE";
const TODO_MODIFY = "todo/TODO_MODIFY";
const TODO_FINISH = "todo/TODO_FINISH";
const TODO_STATE = "todo/TODO_STATE";
const CHANGE_MODIFY_INPUT = "todo/CHANGE_MODIFY_INPUT";
const CREATE_TODO = "todo/CREATE_TODO";

/* todo reducer */

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

let nextID = 3;
const initialState = [
  {
    id: 1,
    todo: "todo1",
    isCompleted: false,
    userId: 1,
  },
  {
    id: 2,
    todo: "todo2",
    isCompleted: false,
    userId: 1,
  },
];

const todoReducer = handleActions(
  {
    [TODO_CREATE]: (todos, { payload: text }) =>
      produce(todos, (draft) => {
        draft.push({
          id: nextID++,
          todo: text,
          isCompleted: false,
          userId: 1,
        });
      }),
    [TODO_REMOVE]: (todos, { payload: id }) =>
      todos.filter((todo) => todo.id !== id),
    [TODO_MODIFY]: (todos, { payload: { id, modifyVal } }) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: modifyVal } : todo
      ),
    [TODO_FINISH]: (todos, { payload: id }) => {
      todos.map((todo) =>
        {console.log(todo.id == id)
          return todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo}
      );
    },
    [TODO_STATE]: (todos) => {
      return todos;
    },
    [CHANGE_MODIFY_INPUT]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
        console.log(state);
      }),
  },
  initialState
);

export default todoReducer;
