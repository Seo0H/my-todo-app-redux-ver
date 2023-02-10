import client from "./client";

//createTodo
export const createTodoApi = async (todo) => {
  await client.post("/todos", { todo: todo });
};

//getTodos
export const getTodosApi = async () => client.get("/todos");

//updateTodo
export const updateTodoApi = async (id, todo, isCompleted) => {
  await console.log(`updateTodoApi:${id}, ${todo}, ${isCompleted}`);
  await client.put(`/todos/${id}`, { todo: todo, isCompleted: isCompleted });
};

//deleteTodo
export const deleteTodoApi = async (id) => {
  await client.delete(`/todos/${id}`);
};
