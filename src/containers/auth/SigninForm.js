import AuthForm from "../../components/auth/AuthForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "../../modules/auth";
import { signInApi } from "./../../lib/api/auth";

const SigninForm = () => {
  const dispatch = useDispatch();

  const { form } = useSelector(({ authReducer }) => ({
    form: authReducer.singIn,
  }));

  // 여기 있는 action을 다 리듀서로 보내버리고싶은데 일단 나중에 구현

  const emailFn = new RegExp("@");
  const passwordFn = new RegExp("(?=.{8,})"); // 공백 제외 8자 이상

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [pwisValid, setPwIsValid] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  /**
   * @param {String} name : tag의 name을 의미합니다. email, password
   * @param {String} value : 사용자 input을 의미합니다.
   */
  useEffect(() => {
    if (emailIsValid && pwisValid) setIsValid(true);
  }, [emailIsValid, pwisValid]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (emailFn.test(value)) {
        setEmailIsValid(true);
        setEmailMessage("");
      } else {
        setEmailIsValid(false);
        setEmailMessage("이메일에는 @를 포함해 작성해주세요");
      }
    }

    if (name === "password") {
      if (passwordFn.test(value)) {
        setPwIsValid(true);
        setPwMessage("");
      } else {
        setPwIsValid(false);
        setPwMessage("비밀번호는 8자 이상으로 작성해주세요.");
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

  // FORM Submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    signInApi(email, password);
  };

  return (
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
  );
};

export default SigninForm;
