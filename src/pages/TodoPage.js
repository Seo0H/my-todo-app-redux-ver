import BasicTemplate from "../components/common/BasicTemplate";
import TodoHeader from "../components/todo/TodoHeader";
import TodoListContainer from "../containers/todo/TodoListContainer";
import TodoCreateBox from "./../components/todo/TodoCreateBox";

const TodoPage = () => {
  return (
    <BasicTemplate whatIsType="TO-DO">
      <TodoHeader />
      <TodoListContainer />
    </BasicTemplate>
  );
};

export default TodoPage;
