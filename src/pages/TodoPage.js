import BasicTemplate from "../components/common/BasicTemplate";
import TodoHeader from "../components/todo/TodoHeader";
import TodoList from "../containers/todo/TodoList";

const TodoPage = () => {
  return (
    <BasicTemplate whatIsType="TO-DO">
      <TodoHeader />
      <TodoList />
    </BasicTemplate>
  );
};

export default TodoPage;
