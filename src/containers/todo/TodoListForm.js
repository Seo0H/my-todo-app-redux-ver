import palette from "../../lib/styles/palette";
import styled from "styled-components";
import TodoCreateBox from "../../components/todo/TodoCreateBox";
import TodoListBox from "../../components/todo/TodoListBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getTodos,
  todoCreate,
  todoRemove,
  todoUpdate,
} from "../../modules/todo";
import { useCallback, useEffect } from "react";
import TodoHeader from "../../components/todo/TodoHeader";
import { useNavigate } from "react-router-dom";
import { changeSignInStatus } from "../../modules/auth";

const TodoListBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 2rem;
    margin-top: 1rem;
    font-weight: 900;
    font-size: 28px;
  }
`;

/**
 * @components `TodolistForm` : `todoReducer` 리덕스를 통해 정보를 받아오는 공간입니다.
 * `TodoForm`에서 필요한 정보를 disptch로 받아와 해당 컴포넌트에 props로 전달합니다.
 */
function TodoListForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { todos } = useSelector(({ todo }) => ({
    todos: todo.todos,
  }));

  /* first render */
  useEffect(() => {
    dispatch(getTodos());
  }, []);

  /* todo create handler */
  const onCreate = useCallback(
    async (todo) => {
      if (!todo) return;
      await dispatch(todoCreate(todo));
      await dispatch(getTodos());
    },
    [todos]
  );

  /* todo remove handler */
  const onRemove = useCallback(
    async (id, e) => {
      await dispatch(todoRemove(id));
      await dispatch(getTodos());
    },
    [todos]
  );

  /* todo update( checkbox, modify ) handler */
  const onUpdate = useCallback(
    async ({ id, todo, isCompleted }) => {
      await dispatch(todoUpdate({ id, todo, isCompleted }));
      await dispatch(getTodos());
    },
    [todos]
  );

  const onLogount = (e) => {
    localStorage.clear();
    dispatch(changeSignInStatus());
    alert("로그아웃되엇슴다");
    navigate("/signin");
    e.preventDefault();
  };

  return (
    <TodoListBlock>
      <TodoHeader onLogount={onLogount} />
      <h3>TO-DO List</h3>
      <TodoCreateBox onCreate={onCreate} />
      {todos.map((todo) => (
        <TodoListBox
          key={todo.id}
          todo={todo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoListForm;
