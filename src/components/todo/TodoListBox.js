import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "./../common/Button";
import { render } from "@testing-library/react";

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
  todo: { id, todo, isCompleted },
  onFinish,
  onUpdate,
  onRemove,
}) {
  /**
   * modifyMode : 수정 모드를 관리하는 변수
   * modifyVal: 수정된 text를 담는 변수
   * inputRef: input을 가리키는 참조 ref 수정 모드의 오토포커스를 관리하기 위해 사용.
   */
  const [modifyMode, setModifyMode] = useState(false);
  const inputRef = useRef();

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  const onCancel = (e) => {
    setModifyMode(false);
    inputRef.current.value = todo;
    inputRef.current.disabled = true;
    e.preventDefault(); // 이걸안해서 onClick bubbling 생김. 공부가 더 필요할듯
  };

  if (modifyMode) inputRef.current.focus();

  return (
    <TodoBoxBlock>
      <TodoListBlock>
        <input
          type="checkbox"
          name="isCompleted"
          onClick={() => {
            onUpdate({ id, todo, isCompleted: !isCompleted });
          }}
          checked={isCompleted}
          readOnly
        />
        <input
          type="text"
          name="todo"
          autoComplete="off"
          defaultValue={todo}
          // onChange={(e) => {
          //   !e.target.disabled ? e.current.focus() : {};
          // }}
          ref={inputRef}
          disabled={modifyMode ? false : true}
        />

        {modifyMode ? (
          <>
            <StyledButton
              name="modify-todo"
              onClick={(e) => {
                onUpdate({ id, todo: inputRef.current.value, isCompleted });
                setModifyMode(false);
                e.preventDefault();
              }}
            >
              ✅확인
            </StyledButton>
            <StyledButton name="cancel" onClick={(e) => onCancel(e)}>
              ↪️ 취소
            </StyledButton>
          </>
        ) : (
          <>
            <StyledButton
              onClick={(e) => {
                setModifyMode(true);
                e.preventDefault();
              }}
              name="modify"
            >
              ✏️수정
            </StyledButton>
            <StyledButton
              name="delete"
              onClick={(e) => {
                onRemove(id, e);
              }}
            >
              ❌삭제
            </StyledButton>
          </>
        )}
      </TodoListBlock>
    </TodoBoxBlock>
  );
}

export default TodoListBox;
