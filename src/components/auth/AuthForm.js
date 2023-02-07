import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../../components/common/Button";
import { useState } from "react";

//토큰 인증
//만약 토큰이 없다면? -> login page.
//login-register은 initial 에 Action으로 구분

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

// type : login, register 구분
// form: user name, password, passwordConfirm
// onChange
const AuthForm = ({ type, form, onChange, onSubmit }) => {
  let [stateType, setStateType] = useState(type);
  const text = textMap[stateType];

  // 로그인-회원가입 handler
  const changeMode = (e) => {
    e.preventDefault();
    setStateType("register");
  };

  console.log(text);
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          onChange={onChange}
          defaltvalue={form.email}
        />
        <StyledInput
          autoComplete="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          defaltvalue={form.password}
          onchange={onChange}
        />
        {stateType === "register" && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            defaltvalue={form.passwordConfirm}
          />
        )}
        <Button>로그인</Button>
      </form>

      <Footer>
        {stateType === "login" ? (
          <button
            onClick={(e) => {
              setStateType("register");
            }}
          >
            {" "}
            회원가입{" "}
          </button>
        ) : (
          <button
            onClick={(e) => {
              setStateType("login");
            }}
          >
            {" "}
            로그인{" "}
          </button>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
