import client from "./client";

//signin : 로그인
export const signInApi = async (email, password) =>
  await client.post("/auth/signin", { email, password });

//signup : 회원가입
export const signUpApi = async (email, password) =>
  await client.post("/auth/signup", { email, password });
