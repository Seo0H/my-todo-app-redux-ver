import { StyledA } from "./style";

/**
 * @component `TodoHeader` : 로그아웃 버튼을 포함합니다.
 */
function TodoHeader({ onLogount }) {
  return (
    <StyledA onClick={onLogount}> 로그아웃 </StyledA>
  );
}

export default TodoHeader;
