import client from "./client";

export const signInApi = async (email, password) => {
  try {
    await client.post("/auth/signin", { email, password });
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const signUpApi = async (email, password) =>
  client.post("/auth/signup", { email, password });
