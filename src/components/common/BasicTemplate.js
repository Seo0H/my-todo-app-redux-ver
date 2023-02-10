import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

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
 * 기본 레이아웃 컴포넌트입니다.
 * @props `whatIsType` : todo의 박스 크기를 조절합니다.
 */
function BasicTemplate({ children, whatIsType }) {
  return (
    <BasicTemplateBlock>
      <WhiteBox className="wite-box" whatIsType={whatIsType}>
        {children}
      </WhiteBox>
    </BasicTemplateBlock>
  );
}

export default BasicTemplate;
