import React, { useCallback, useEffect, useRef, useState } from "react";
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
  onModify,
  onRemove,
}) {
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyVal, setModifyVal] = useState(todo);

  const todoInput = useRef();

  const onChange = useCallback((e) => {
    setModifyVal(e.target.value);
  }, []);

  let modifyCount = false;
  const onCancel = (e) => {
    setModifyMode((props)=> !props);
    todoInput.current.disabled = true;
    setModifyVal({...todo,});
  };

  const ModifyBtn = () => {
    return (
      <>
        <StyledButton
          onClick={(e) => {
            onModify(id, modifyVal);
            setModifyMode(false);
            modifyCount = true;
            e.preventDefault();
          }}
        >
          ✅확인
        </StyledButton>
        <StyledButton name="cancel" onClick={(e) => onCancel(e)}>
          ❌취소
        </StyledButton>
      </>
    );
  };

  const DefaltBtn = () => {
    return (
      <>
        <StyledButton
          onClick={(e) => {
            setModifyMode(true);
            todoInput.current.disabled = false;
            todoInput.current.focus();
            e.preventDefault();
          }}
          name="modify"
        >
          ✏️수정
        </StyledButton>
        <StyledButton name="delete" onClick={() => onRemove(id)}>
          ❌삭제
        </StyledButton>
      </>
    );
  };

  return (
    <TodoBoxBlock>
      <TodoListBlock>
        <input
          type="checkbox"
          name="checkbox"
          value={id}
          onClick={(e) => onFinish( parseInt(e.target.value) )}
          iscompleted={isCompleted.toString()}
        />
        <input
          type="text"
          name="todo"
          defaultValue={modifyVal}
          onChange={onChange}
          ref={todoInput}
          disabled
        />
        {modifyMode ? <ModifyBtn /> : <DefaltBtn />}
      </TodoListBlock>
    </TodoBoxBlock>
  );
}

export default TodoListBox;
