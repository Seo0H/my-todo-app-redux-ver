import { createAction, handleActions } from "redux-actions";
import produce from "immer";

/* Auth action type */
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const VAILD = "auth/VAILD";

/**
 * @param {Object} form { signUp, singIn };
 * @param {Object} key { email, password, passwordConfirm };
 * @param {String} value user-input
 */
// export const changeField = createAction(
//   CHANGE_FIELD,
//   ({ form, key, value }) => ({
//     form,
//     key,
//     value,
//   })
// );

/**
 * @param {Object} valid = { {boolean} isvalid , {string} message }
 */
export const actionValid = createAction(VAILD, ({ form, key, valid }) => ({
  form,
  key,
  valid,
}));

const initialState = {
  signUp: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  singIn: {
    email: "",
    password: "",
  }
};

/* auth reducer */
const authReducer = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: { payload: form } }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [VAILD]: (state, { payload: { form, key, valid } }) => null,
  },
  initialState
);

