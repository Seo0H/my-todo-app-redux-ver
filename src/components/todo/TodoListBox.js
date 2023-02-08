import React, { useRef, useState } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "./../common/Button";

const TodoBoxBlock = styled.li`
  width: 100%;
`;
const TodoListBlock = styled.label`
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${palette.gray[1]};
  border-top: 1px solid ${palette.gray[1]};
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  input[type="text"] {
    flex: 1;
    border: none;
    font-size: 1.08rem;
    background: none;
    &:focus {
      outline: none;
    }
  }
`;

const StyledButton = styled(Button)`
  margin-left: 0.25rem;
  height: 2rem;
  background: ${palette.gray[2]};
  font-weight: 500;
  color: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[3]};
  }
`;

function TodoListBox({
  form: { id, todo, isCompleted },
  onChange,
  onSubmit,
  onClick,
}) {
  const [modifyMode, setModifyMode] = useState(false);
  const todoInput = useRef();

  return (
    <TodoBoxBlock>
      <form>
        <TodoListBlock name={id}>
          <input
            type="checkbox"
            name="checkbox"
            onChange={onChange}
            iscompleted={isCompleted.toString()}
          />
          <input
            type="text"
            name="todo"
            onChange={onChange}
            defaultValue={todo}
            ref={todoInput}
            disabled
          />
          {modifyMode ? (
            <>
              <StyledButton name="submit" onClick={onClick(todoInput)}>
                ✅확인
              </StyledButton>
              <StyledButton
                name="cancel"
                onClick={() => {
                  setModifyMode(false);
                  todoInput.current.disabled = true;
                }}
              >
                ❌취소
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  setModifyMode(true);
                  todoInput.current.disabled = false;
                  todoInput.current.focus();
                }}
                name="modify"
              >
                ✏️수정
              </StyledButton>
              <StyledButton name="delete">❌삭제</StyledButton>
            </>
          )}
        </TodoListBlock>
      </form>
    </TodoBoxBlock>
  );
}

export default TodoListBox;
