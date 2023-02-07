import AuthForm from "../../components/auth/AuthForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionValid, changeField } from "../../modules/auth";
import { signUpApi } from "../../lib/api/auth";
import { signInApi } from './../../lib/api/auth';

const SigninForm = () => {
  const dispatch = useDispatch();

  const { form, auth, authError } = useSelector(({ authReducer }) => ({
    form: authReducer.singIn,
    auth: authReducer.auth,
    authError: authReducer.authError,
  }));

  //처음부터 메시지 15
  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState("");

  const emailFn = new RegExp("@");
  const passwordFn = new RegExp("(?=(w|d){8,})"); // 공백 제외 8자 이상

  const onBlur = (e) => {
    const { value, name } = e.target;

    if (value === "") {
      setValid(false);
      setMessage("빈칸을 다 채워 주세요.");
    }

    if (name === "email") {
      if (emailFn.test(value)) setValid(true);
      else {
        setValid(false);
        setMessage("이메일에는 @가 포함되어야 합니다.");
      }
    }

    if (name === "password") {
      if (passwordFn.test(value)) setValid(true);
      else {
        setValid(false);
        setMessage("비밀번호는 (공백 제외) 8자 이상이어야 합니다. ");
      }
    }

    dispatch(
      changeField({
        form: "singIn",
        key: name,
        value,
      })
    );
  };

  // for Submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    console.log(email, password);

    signInApi(email, password)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        alert("로그인 성공");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(()=>{
        console.log('요청 완');
      });
  };

  return (
    <AuthForm
      type="signin"
      form={form}
      onBlur={onBlur}
      onSubmit={onSubmit}

      //유효성 검사 관련 props
      valid={valid}
      message={message}
    />
  );
};

export default SigninForm;
