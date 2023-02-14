import React, { useLayoutEffect, useRef, useState } from "react";
import { TodoBoxBlock, StyledButton, TodoListBlock } from "./style";

/**
 * @components `TodoListBox` : todoList를 보여줍니다. 등록된 todo를 수정, 삭제, 완료를 할 수 있습니다.
 * @props `todo` : { id, todo, isCompleted }
 * @props `onUpdate` : 수정(chekcBox, modify) handler
 * @props `onRemove` : 삭제 handler
 */
function TodoListBox({ todo: { id, todo, isCompleted }, onUpdate, onRemove }) {
  /**
   * modifyMode : 수정 모드를 관리하는 변수
   * modifyVal: 수정된 text를 담는 변수
   * inputRef: input을 가리키는 참조 ref. 기본-수정모드 변화에 따른 상태를 관리하기 위해 사용.
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
    e.preventDefault();
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
          data-testid="modify-input"
          name="todo"
          autoComplete="off"
          defaultValue={todo}
          ref={inputRef}
          disabled={modifyMode ? false : true}
        />

        {modifyMode ? (
          <>
            <StyledButton
              data-testid="submit-button"
              name="modify-todo"
              onClick={(e) => {
                onUpdate({ id, todo: inputRef.current.value, isCompleted });
                setModifyMode(false);
                e.preventDefault();
              }}
            >
              ✅확인
            </StyledButton>
            <StyledButton
              data-testid="cancel-button"
              name="cancel"
              onClick={(e) => onCancel(e)}
            >
              ↪️ 취소
            </StyledButton>
          </>
        ) : (
          <>
            <StyledButton
              data-testid="modify-button"
              onClick={(e) => {
                setModifyMode(true);
                e.preventDefault();
              }}
              name="modify"
            >
              ✏️수정
            </StyledButton>
            <StyledButton
              data-testid="delete-button"
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
