import client from "./client";

export const signInApi = async (email, password) =>{
  client.post("/auth/signin", { email, password })};

export const signUpApi = async (email, password) =>
  client.post("/auth/signup", { email, password });
