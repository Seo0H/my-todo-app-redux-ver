import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

/**
 * 회원가입 / 로그인 페이지의 레이아웃 담당 컴포넌트
 */

/* 화면 중앙 전체 채우기 */
const BasicTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};

  /*flex로 내부 내용 중앙 정렬*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 500;
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.02);
  padding: 2rem;
  width: ${(props) => (props.whatIsType === "TO-DO" ? `500px` : `360px`)};
  background: white;
  border-radius: 2px;
`;

/**
 * @param {String} whatIsType : 로그인 페이지인지, 회원가입 페이지인지, TO-DO 페이지인지를 알려줍니다.
 * @returns
 */
function BasicTemplate({ children, whatIsType }) {
  return (
    <BasicTemplateBlock>
      <WhiteBox className="wite-box" whatIsType={whatIsType}>
        {/* <div className="logo-area">
                    <Link to="/">{whatIsType}</Link>
                </div>*/}
        {children}
      </WhiteBox>
    </BasicTemplateBlock>
  );
}

export default BasicTemplate;
