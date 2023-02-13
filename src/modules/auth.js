import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpApi, signInApi } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";
import { createAction } from "redux-actions";
import produce from "immer";

/* authApi action type */
const CHANGE_FIELD = "auth/CHANGE_FIELD";

const POST_SIGNIN = "auth/POST_SIGNIN"; // 로그인
const SIGNIN_SUCCESS = "auth/SIGNIN_SUCCESS"; // 로그인 성공
const SIGNIN_ERROR = "auth/SIGNIN_ERROR"; // 로그인 실패

const POST_SIGNUP = "auth/POST_SIGNUP"; // 회원가입
const SIGNUP_SUCCESS = "auth/SIGNUP_SUCCESS"; // 회원가입 성공
const SIGNUP_ERROR = "auth/SIGNUP_ERROR"; // 회원가입 실패

/* authApi Thunk Action */
// 회원가입
export const postSignUp = createAsyncThunk(
  POST_SIGNUP,
  async ({ email, password }) => {
    try {
      await signUpApi(email, password);
    } catch ({ response }) {
      throw response.data;
    }
  }
);

// 로그인
export const postSignIn = createAsyncThunk(
  POST_SIGNIN,
  async ({ email, password }) => {
    try {
      const { data: access_token } = await signInApi({ email, password });
      return access_token;
    } catch ({ response }) {
      throw response.data;
    }
  }
);

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
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeField: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    changeSignInStatus: (state) => {
      state.status = "signin";
    },
  },
  extraReducers: (builder) => {
    /* postSignUp Thunk Reducer */
    builder
      .addCase(postSignUp.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(postSignUp.fulfilled, (state) => {
        console.log("postSignUp COMPLETE");
        state.status = "postSignUp/COMPLETE";
      })
      .addCase(postSignUp.rejected, (state, { error: { message } }) => {
        console.log("postSignUp FAIL .. ");
        alert(message);
        state.status = "FAIL";
      })

    /* postSignIn Thunk Reducer */
    .addCase(postSignIn.pending, (state) => {
      // console.log("postSignIn LOADING .. ");
      state.status = "LOADING";
    })
    .addCase(
      postSignIn.fulfilled,
      (state, { payload: { access_token } }) => {
        // console.log("postSignIn COMPLETE .. ");
        localStorage.setItem("access_token", access_token);
        state.status = "postSignIn/COMPLETE";
      }
    )
    .addCase(postSignIn.rejected, (state, { error: { message } }) => {
      // console.log("postSignIn FAIL .. ");
      console.log(message);
      state.status = "postSignIn/FAIL";
    });
  },
});

export default authSlice;
export const { changeField, changeSignInStatus } = authSlice.actions;
