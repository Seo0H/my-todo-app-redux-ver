import palette from "../../lib/styles/palette";
import styled from "styled-components";
import TodoCreateBox from "../../components/todo/TodoCreateBox";
import TodoListBox from "../../components/todo/TodoListBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getTodos,
  todoCreate,
  todoFinish,
  todoRemove,
  todoUpdate,
} from "../../modules/todo";
import { useCallback, useEffect, useState } from "react";
import { todoModify } from "./../../modules/todo";
import { getTodosApi } from "../../lib/api/todo";

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
 * @components `TodolistForm` = 리듀서를 불러 정보를 가공하는 공간입니다.
 * `TodoForm`에서 View를 보여주는 필요한 정보를 가공해 인자로 전달합니다.
 * @returns
 */

function TodoListContainer() {
  const dispatch = useDispatch();
  const { todos, status, test } = useSelector((state) => ({
    todos: state.todoReducer.todos,
    status: state.todoReducer.status,
    test: state,
  }));

  /* first render */
  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const onCreate = useCallback(
    async (todo) => {
      if (!todo) return;
      await dispatch(todoCreate(todo));
      await dispatch(getTodos());
    },
    [todos]
  );

  const onRemove = useCallback(
    async (id, e) => {
      await dispatch(todoRemove(id));
      await dispatch(getTodos());
    },
    [todos]
  );

  const onUpdate = useCallback(
    async ({ id, todo, isCompleted }) => {
      // id, todo, isCompleted 넘겨줘야 함.
      // onUpdate 감지되면 해당 checkbox isChecked , input val 냅다 가져오기
      // 그러니까...
      console.log( id, todo, isCompleted);
      await dispatch(todoUpdate({id, todo, isCompleted}));
      await dispatch(getTodos());
    },
    [todos]
  );

  const onFinish = useCallback(
    (id) => {
      dispatch(todoFinish(id));
    },
    [todos]
  );

  return (
    <TodoListBlock>
      <h3>TO-DO List</h3>
      <TodoCreateBox onCreate={onCreate} />
      {todos.map((todo) => (
        <TodoListBox
          key={todo.id}
          todo={todo}
          onFinish={onFinish}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoListContainer;
