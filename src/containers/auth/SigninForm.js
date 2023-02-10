import AuthForm from "../../components/auth/AuthForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "../../modules/auth";
import { signInApi } from "./../../lib/api/auth";
import { useNavigate } from "react-router-dom";

/**
 * @components `SigninForm` : `authReducer` 리덕스를 통해 정보를 받아오는 공간입니다.
 * `로그인`에 필요한 정보를 disptch로 받아와 `AuthForm`에 props로 전달합니다.
 */
const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form } = useSelector(({ authReducer }) => ({
    form: authReducer.singIn,
  }));

  // 여기 있는 action을 다 리듀서로 보내버리고싶은데 일단 나중에 구현

  // 유효성 검사 개체
  const emailExp = new RegExp("@");
  const passwordExp = new RegExp("(?=.{8,})");

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

  const onChange = (e) => {
    /**
     * @param {String} name : 해당 tag의 name을 의미합니다. (email, password)
     * @param {String} value : 사용자 input을 의미합니다.
     */
    const { name, value } = e.target;
    if (name === "email") {
      if (emailExp.test(value)) {
        setEmailIsValid(true);
        setEmailMessage("");
      } else {
        setEmailIsValid(false);
        setEmailMessage("이메일에는 @를 포함해 작성해주세요");
      }
    }

    if (name === "password") {
      if (passwordExp.test(value)) {
        setPwIsValid(true);
        setPwMessage("");
      } else {
        setPwIsValid(false);
        setPwMessage("비밀번호는 8자 이상으로 작성해주세요.");
      }
    }

    // 사용자 입력 변화 감지 dispatch
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
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    signInApi(email, password)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("User_id", email);
        alert("로그인 성공");
        navigate("/todo");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <AuthForm
        type="signin"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}

        //유효성 검사 관련 props
        isValid={isValid}
        emailMessage={emailMessage}
        pwMessage={pwMessage}
      />
    </>
  );
};

export default SigninForm;
