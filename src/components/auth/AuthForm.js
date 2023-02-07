import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../../components/common/Button";
import { useState } from "react";

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

const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  signup: "회원가입",
  signin: "로그인",
};

// type : signup, signup 구분
// form: user name, password, passwordConfirm
// onChange
const AuthForm = ({ type, form, onBlur, onSubmit, valid }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit} >
        <StyledInput
          data-testid="email-input"
          autoComplete="email"
          name="email"
          placeholder="이메일"
          onBlur={onBlur}
          defaltvalue={form.email}
        />
        <StyledInput
          data-testid="password-input"
          autoComplete="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          defaltvalue={form.password}
          onBlur={onBlur}
        />
        {type === "signup" && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onBlur={onBlur}
            defaltvalue={form.passwordConfirm}
          />
        )}
        {/* 나중에 이부분 js로 수정해도 될듯... */}
        {type === "signup" ? (
          <StyledButton onSubmit={onSubmit} fullWidth data-testid="signup-button" disabled={!valid}>
            회원가입
          </StyledButton>
        ) : (
          <StyledButton onSubmit={onSubmit} fullWidth data-testid="signin-button" disabled={!valid}>
            로그인
          </StyledButton>
        )}
      </form>

      <Footer>
        {type === "signup" ? (
          <Link to="/signin">로그인</Link>
        ) : (
          <Link to="/signup">회원가입</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
