import AuthForm from "../../components/auth/AuthForm";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, changeSignInStatus, postSignIn } from "../../modules/auth";
import { useNavigate } from "react-router-dom";
import useAuthVaild from "./../../lib/hooks/useAuthVaild";

/**
 * @components `SigninForm` : `authReducer` 리덕스를 통해 정보를 받아오는 공간입니다.
 * `로그인`에 필요한 정보를 disptch로 받아와 `AuthForm`에 props로 전달합니다.
 */
const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, status } = useSelector(({ auth }) => ({
    form: auth.singIn,
    status: auth.status,
  }));

  useEffect(() => {
    dispatch(changeSignInStatus());
  }, []);

  //유효성 검사 관련 handler
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [pwisValid, setPwIsValid] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  // 로그인 버튼 활성화 handler
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (emailIsValid && pwisValid) setIsValid(true);
  }, [emailIsValid, pwisValid]);



  // input 변화 감지 handler
  const OnChange = (e) => {
    /**
     * @param {String} name : tag name ('email' || 'password')
     * @param {String} value : user input
     */
    const { name, value } = e.target;

    const message = useAuthVaild(name, value);

    if (name === "email") {
      if (!message) {
        setEmailIsValid(true);
        setEmailMessage("");
      } else {
        setEmailIsValid(false);
        setEmailMessage(message);
      }
    }

    if (name === "password") {
      if (!message) {
        setPwIsValid(true);
        setPwMessage("");
      } else {
        setPwIsValid(false);
        setPwMessage(message);
      }
    }

    // 입력 변화 감지 dispatch
    dispatch(
      changeField({
        form: "singIn",
        key: name,
        value,
      })
    );
  };

  // FORM Submit handler
  // Thunk 로 분리 예정
  const onClick = async (e) => {
    const { email, password } = form;
    e.preventDefault();
    dispatch(postSignIn({ email, password }));
  };

  useEffect(() => {
    if (status === "postSignIn/COMPLETE") {
      alert("로그인 성공");
      navigate("/todo");
    }

    if (status === "postSignIn/FAIL") {
      alert("해당 유저가 존재하지 않습니다.");
    }

  }, [status]);

  return (
    <>
      <AuthForm
        type="signin"
        form={form}
        onChange={OnChange}
        onClick={onClick}
        //유효성 검사 관련 props
        isValid={isValid}
        emailMessage={emailMessage}
        pwMessage={pwMessage}
      />
    </>
  );
};

export default SigninForm;
