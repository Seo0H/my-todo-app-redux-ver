import palette from "../../lib/styles/palette";
import styled from "styled-components";
import TodoCreateBox from "../../components/todo/TodoCreateBox";
import TodoListBox from "../../components/todo/TodoListBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeField, changeModifyInput } from "./../../modules/todo";

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
function TodoList() {
  const dispatch = useDispatch();
  const { form } = useSelector(({ todoReducer }) => ({
    form: todoReducer,
  }));

  const onChangeInput = (e) => {
    const { value, name } = e.target;
  };

  /**
   * 우선 값 input [text, checkbox ] 값이 리듀서로 잘 전달되는지 확인
   */
  const onChange = (e) => {
    const { value, name } = e.target;
    // console.log(name, value);

    if (name === "todo") {
      // dispatch(
      //   changeModifyInput({
      //     key: name,
      //     value: value,
      //   })
      // );
    }
  };

  const onClick = (e, { todoInput }) => {
    e.preventDefault();
    const { id, todo } = form;
    console.log("id: ", id, "todo: ", todo);
    console.log(todoInput);

    dispatch(
      changeModifyInput({
        key: "todo",
        value: todo,
      })
    );
  };

  const onSubmit = (e) => {
    const { id, todo } = form;
    console.log(e.target);
    console.log("id: ", id, "todo: ", todo);
  };

  return (
    <TodoListBlock>
      <h3>TO-DO List</h3>
      <TodoCreateBox />
      <TodoListBox
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
      />
    </TodoListBlock>
  );
}

export default TodoList;
