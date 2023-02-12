import React, { useCallback, useState } from "react";
import { TodoCreateBoxBlock, TodoForm } from "./style";

/**
 * @component `TodoCreateBox` : 새로운 todo를 입력하는 inpute 이 위치합니다.
 * @props `onCreate`: 입력 버튼의 handler 입니다.
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
          data-testid="new-todo-input"
          name="todo"
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={onChange}
        />
        <button data-testid="new-todo-add-button" type="submit">ADD</button>
      </TodoForm>
    </TodoCreateBoxBlock>
  );
}

export default TodoCreateBox;
