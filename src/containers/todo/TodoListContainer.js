import palette from "../../lib/styles/palette";
import styled from "styled-components";
import TodoCreateBox from "../../components/todo/TodoCreateBox";
import TodoListBox from "../../components/todo/TodoListBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { todoCreate, todoFinish, todoRemove } from "../../modules/todo";
import { useCallback, useState } from "react";
import { todoModify } from './../../modules/todo';

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
  const { todos } = useSelector(({ todoReducer }) => ({
    todos: todoReducer,
  }));
  const [todos2, setTodos] = useState([]);

  const onCreate = useCallback(
    (text) => {
      if (text === "") return;
      dispatch(todoCreate(text));
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {dispatch(todoRemove(id));},
    [todos]
  );

  const onModify = useCallback(
    (id, value) => {
      dispatch(todoModify(id, value));
    },
    [todos]
  );

  const onFinish = useCallback(
    (id) => {
      dispatch(todoFinish(id));
      console.log(todos)
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
          onModify={onModify}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoListContainer;
