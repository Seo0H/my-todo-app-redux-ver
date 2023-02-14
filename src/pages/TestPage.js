import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "./../modules/todo";
import TodoListBox from "./../components/todo/TodoListBox";

const TestPage = () => {
  const dispatch = useDispatch();

  const { todos } = useSelector(({ todo }) => ({
    todos: todo.todos,
  }));

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      todos.sort((a, b) => {
        if (a.isCompleted > b.isCompleted) {
          return 1;
        }
        if (a.isCompleted < b.isCompleted) {
          return -1;
        }
      });
      console.log(todos);
    }
  }, [todos]);

  return (
    <>
      {/* {todos.map((todo) => (
        <div key={todo.id}>
          <a>{todo.todo}</a> <br />
          <a>{toString(todo.isCompleted)}</a> <br />
        </div>
      ))} */}
    </>
  );
};

export default TestPage;
