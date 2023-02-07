import { useState } from "react";
import styled from "styled-components";
import CounterContainer from './containers/CounterContainer';

// event hendler

const CustumDiv = styled.div`
  font-weight: 800;
`;

const Hello = ({ color, name, isSpecial }) => {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}{" "}
    </div>
  );
};

const TestPage = () => {
  let [type, setType] = useState(false);
  let [isSpecial, setIsSpecial] = useState(true);

  const onClick = () => {
    setType(!type)
    setIsSpecial(!isSpecial);
  };

  Hello.defaltProps = {
    name: "이름없음",
  };



  return (
    <>
      <h1>테스트 페이지 입니다.</h1>
      <Hello name="react" color="red" isSpecial={isSpecial} />
      <br />
      {type && <div> 버튼을 누르셨군요? </div>}
      <button onClick={onClick}>버튼</button>
      <hr />
      <CounterContainer />
    </>
  );
};

export default TestPage;
