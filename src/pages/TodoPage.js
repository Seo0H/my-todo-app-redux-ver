import BasicTemplate from "../components/common/BasicTemplate";
import TodoHeader from "../components/todo/TodoHeader";
import TodoListContainer from "../containers/todo/TodoListContainer";
import TodoCreateBox from "./../components/todo/TodoCreateBox";
import { Navigate, useNavigate } from "react-router-dom";

const TodoPage = () => {
  const JWT = localStorage.getItem("access_token") ? true : false;
  if (!JWT) {
    alert("로그인 해주세요");
    return <Navigate to="/signin" />
  }

  return (
    <BasicTemplate whatIsType={"TO-DO"}>
      <TodoListContainer />
    </BasicTemplate>
  );
};

export default TodoPage;
