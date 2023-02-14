import palette from "../../lib/styles/palette";
import styled from "styled-components";
import Button from "../common/Button";

export const TodoCreateBoxBlock = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export const TodoForm = styled.form`
  border-radius: 7px;
  overflow: hidden;
  display: flex;
  border: 1px solid ${palette.gray[5]};

  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
    color: ${palette.gray[7]};
  }
  button {
    background: ${palette.gray[2]};
    font-weight: 700;
    &:hover {
      background: ${palette.gray[3]};
      color: ${palette.gray[9]};
    }
  }
  input {
    padding: 0.5rem;
    flex: 1;
    &:focus {
      color: ${palette.gray[9]};
    }
  }
`;

export const TodoBoxBlock = styled.li`
  width: 100%;
`;

export const TodoListBlock = styled.label`
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${palette.gray[1]};
  border-top: 1px solid ${palette.gray[1]};
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    &:checked{
      color: ${palette.gray[9]};
    }
  }

  input[type="text"] {
    flex: 1;
    border: none;
    font-size: 1.08rem;
    background: none;
    &:focus {
      outline: none;
    }
  }

  input[type="checkbox"]:checked + input[type="text"] {
    color: ${palette.gray[5]};
    text-decoration: line-through;
  }
`;

export const StyledButton = styled(Button)`
  margin-left: 0.25rem;
  height: 2rem;
  background: ${palette.gray[2]};
  font-size: 0.9rem;
  font-weight: 700;
  color: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[3]};
  }
`;

export const StyledA = styled.a`
  color: ${palette.gray[6]};
  text-decoration: underline;
  cursor: pointer;
  hover {
    color: ${palette.gray[9]};
  }
`;
