import React, { useLayoutEffect, useRef, useState } from "react";
import { TodoBoxBlock, StyledButton, TodoListBlock } from "./style";

/**
 * @components `TodoListBox` : todoList를 보여줍니다. 등록된 todo를 수정, 삭제, 완료를 할 수 있습니다.
 * @props `todo` : { id, todo, isCompleted }
 * @props `onUpdate` : 수정(chekcBox, modify) handler
 * @props `onRemove` : 삭제 handler
 */
function TodoListBox({
  todo: { id, todo, isCompleted },
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
