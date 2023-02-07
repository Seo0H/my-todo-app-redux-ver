import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as authAPI from "../lib/api/auth";
import createRequestActionTypes from "./../lib/createActionType";
import ChekcValid from "../lib/util/checkValid";
import { useEffect } from 'react';

/* action type 선언 */
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const VAILD = "auth/VAILD";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");

/**
 * @param {Object} form = { signUp, singIn };
 * @param {Object} key = { email, password, passwordConfirm };
 * @param {String} value = '' // 유저가 바꾸려는 값
 */
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);

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
  },
  valid: {
    isValid: false,
    message: "",
  },
};

const authReducer = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: { payload: form } }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    [VAILD]: (state, { payload: { form, key, valid } }) => (null),
  },
  initialState
);

export default authReducer;
