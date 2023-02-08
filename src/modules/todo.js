import { createAction, handleActions } from "redux-actions";
import produce from "immer";

/* todo action type */
const CHANGE_ADD_INPUT = "todo/CHANGE_ADD_INPUT";
const CHANGE_MODIFY_INPUT = "todo/CHANGE_MODIFY_INPUT";
const CREATE_TODO = "todo/CREATE_TODO";

/* todo reducer */

export const changeModifyInput = createAction(
  CHANGE_MODIFY_INPUT,
  ({ key, value }) => ({
    key, //tag name
    value, // user input
  })
);

let id = 1;
const initialState = {
  id: id,
  todo: "todo",
  isCompleted: false,
};

const todoReducer = handleActions(
  {
    [CHANGE_MODIFY_INPUT]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
        console.log(state);
      }),
  },
  initialState
);

export default todoReducer;
