import { useNavigate } from "react-router-dom";

function TodoHeader() {
  const navigate = useNavigate();
  const onLogount = (e) => {

    // { //이후 모달창 구현
    //   confirm("로그아웃 하시겠습니까?")
    //   && localStorage.clear();
    //     navigate("/signup");
    // }

    localStorage.clear();
    alert("로그아웃되엇슴다");
    navigate("/signin");
    e.preventDefault();
  };

  return <button onClick={onLogount} > 로그아웃 </button>;
}

export default TodoHeader;
