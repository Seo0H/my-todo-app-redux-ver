import { useNavigate } from "react-router-dom";

/**
 * @component `TodoHeader` : 로그아웃 버튼을 포함합니다.
 */
function TodoHeader({onLogount}) {
  return <button onClick={onLogount} > 로그아웃 </button>;
}

export default TodoHeader;
