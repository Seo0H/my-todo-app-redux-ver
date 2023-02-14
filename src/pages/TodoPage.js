import BasicTemplate from "../components/common/BasicTemplate"
import TodoListForm from "../containers/todo/TodoListForm";
import { Navigate, useNavigate } from 'react-router-dom';

const TodoPage = () => {

  const navigate = useNavigate();
  const hasJWT = localStorage.getItem("access_token") ? true : false;
  if (!hasJWT) {
    alert("로그인 해주세요");
    return <Navigate to={"/signin"} />
  }

  return (
    <BasicTemplate whatIsType={"TO-DO"}>
      <TodoListForm />
    </BasicTemplate>
  );
};

export default TodoPage;
