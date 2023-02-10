import Button from "../../components/common/Button";
import palette from "../../lib/styles/palette";
import styled from "styled-components";

export const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 2rem;
    margin-top: 1rem;
    font-weight: 900;
    font-size: 28px;
  }
`;

export const StyledInput = styled.input`
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

export const Footer = styled.div`
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

export const StyledButton = styled(Button)`
  margin-top: 1rem;
  :disabled {
    background: #ccc;
  }
`;
export const WarnMessage = styled.span`
  display: inline-block;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: red;
`;

