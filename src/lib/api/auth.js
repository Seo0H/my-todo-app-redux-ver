import client from "./client";

/* AUTH API */
export const signInApi = async ({email, password}) =>
  await client.post("/auth/signin", { email, password });

export const signUpApi = async (email, password) =>
  await client.post("/auth/signup", { email, password });
