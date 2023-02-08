import React, { useCallback, useState } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import TodoListBox from "./TodoListBox";

//이거안씀
const TodoCreateBoxBlock = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const TodoForm = styled.form`
  border-radius: 7px;
  overflow: hidden;
  display: flex;
  border: 1px solid ${palette.gray[5]};

  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
    color: ${palette.gray[7]};
  }
  button {
    background: ${palette.gray[2]};
    font-weight: 500;
    &:hover {
      background: ${palette.gray[3]};
      color: ${palette.gray[9]};
    }
  }
  input {
    padding: 0.5rem;
    flex: 1;
    &:focus {
      color: ${palette.gray[9]};
    }
  }
`;

/**
 *
 * @param {function} onChange :
 * @param {function} onClick
 * @returns
 */
function TodoCreateBox({ onCreate }) {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
   setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onCreate(value);
      setValue("");
      e.preventDefault();
    },
    [onCreate, value]
  );

  return (
    <TodoCreateBoxBlock>
      <TodoForm id="todoForm" onClick={onSubmit}>
        <input
          name="todo"
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={onChange}
        />
        <button type="submit">ADD</button>
      </TodoForm>
    </TodoCreateBoxBlock>
  );
}

export default TodoCreateBox;
