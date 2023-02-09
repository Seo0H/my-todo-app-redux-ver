import AuthForm from "../../components/auth/AuthForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "./../../modules/auth";
import { signUpApi } from "../../lib/api/auth";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form } = useSelector(({ authReducer }) => ({
    form: authReducer.signUp,
  }));

  // 여기 있는 action을 다 리듀서로 보내버리고싶은데 일단 나중에 구현

  const emailFn = new RegExp("@");
  const passwordFn = new RegExp("(?=.{8,})"); // 공백 제외 8자 이상

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [pwisValid, setPwIsValid] = useState(false);
  const [pwisConfirmValid, setPwConfirmIsValid] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwConfirmMessage, setpwConfirmMessage] = useState("");

  const [isValid, setIsValid] = useState(false);
  let passwordTmp = "";

  /**
   * @param {String} name : tag의 name을 의미합니다. email, password
   * @param {String} value : 사용자 input을 의미합니다.
   */
  useEffect(() => {
    if (emailIsValid && pwisValid && pwisConfirmValid) setIsValid(true);
  }, [emailIsValid, pwisValid, pwisConfirmValid]);

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
        passwordTmp = value;
      } else {
        setPwIsValid(false);
        setPwMessage("비밀번호는 8자 이상으로 작성해주세요.");
      }
    }

    if (name === "passwordConfirm") {
      if (form.password === value) {
        setPwConfirmIsValid(true);
        setpwConfirmMessage("");
      } else {
        setPwConfirmIsValid(false);
        setpwConfirmMessage("입력하신 비밀번호와 같게 입력해주세요.");
      }
    }

    dispatch(
      changeField({
        form: "signUp",
        key: name,
        value,
      })
    );
  };

  // FORM Submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    signUpApi(email, password).then(() => {
      alert("회원가입 성공");
      navigate("/signin");
    }).catch(err=>{
      alert(err.response.data.message);
    });
  };

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      //유효성 검사 관련 props
      isValid={isValid}
      emailMessage={emailMessage}
      pwMessage={pwMessage}
      pwConfirmMessage={pwConfirmMessage}
    />
  );
};

export default SignupForm;
