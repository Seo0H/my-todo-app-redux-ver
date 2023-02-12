import AuthForm from "../../components/auth/AuthForm";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "./../../modules/auth";
import { signUpApi } from "../../lib/api/auth";
import { useNavigate } from "react-router-dom";
import { postSignUp } from "./../../modules/auth";
import useAuthVaild from "../../lib/hooks/useAuthVaild";

/**
 * @components `SignupForm` : `authReducer` 리덕스를 통해 정보를 받아오는 공간입니다.
 * `회원가입`에 필요한 정보를 disptch로 받아와 `AuthForm`에 props로 전달합니다.
 */
const SignupForm = () => {
  const dispatch = useDispatch();

  const { form, status } = useSelector(({ auth }) => ({
    form: auth.signUp,
    status: auth.status,
  }));

  //유효성 검사 관련 handler
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [pwisValid, setPwIsValid] = useState(false);
  const [pwisConfirmValid, setPwConfirmIsValid] = useState(false);

  const [pwCheckTmp, setPwCheckTmp] = useState();

  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwConfirmMessage, setpwConfirmMessage] = useState("");

  // 회원가입 버튼 활성화 handler
  const [isValid, setIsValid] = useState(false);

  // 회원가입 버튼 활성화 handler
  useEffect(() => {
    if (emailIsValid && pwisValid && pwisConfirmValid) setIsValid(true);
  }, [emailIsValid, pwisValid, pwisConfirmValid]);

  const emailExp = new RegExp("@");
  const passwordExp = new RegExp("(?=.{8,})");

  // input 변화 감지 handler
  const OnChange = (e) => {
    /**
     * @param {String} name : tag의 name을 의미합니다. email, password
     * @param {String} value : 사용자 input을 의미합니다.
     */
    const { name, value } = e.target;

    // const message = useAuthVaild(name, value);

    if (name === "email") {
      if (emailExp.test(value)) {
        setEmailIsValid(true);
        setEmailMessage("");
      } else {
        setEmailIsValid(false);
        setEmailMessage("이메일에는 @를 포함해 작성해주세요.");
      }
    }

    //1. 유효성 검사 통과
    //2. pwCheck 를 먼저 작성 후 pw 작성하는 경우
    //   -> pwcheck 경고창 사라지게
    //3. 다 유효성 통과한 이후 pw 수정해서 pwcheck와 맞지 않는 경우
    if (name === "password") {
      if (passwordExp.test(value)) {
        setPwMessage("");
        setPwIsValid(true);
      } else {
        setPwIsValid(false);
        setPwMessage("비밀번호는 8자 이상으로 작성해주세요.");
      }

      if (form.passwordConfirm === value) {
        setPwIsValid(true);
        setpwConfirmMessage("");
        setPwMessage("");
      }

      if (value !== form.passwordConfirm) {
        setpwConfirmMessage("입력하신 비밀번호와 같게 입력해주세요.");
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

    // 입력 변화 감지 dispatch
    dispatch(
      changeField({
        form: "signUp",
        key: name,
        value,
      })
    );
  };

  // FORM Submit handler
  const navigate = useNavigate();

  const onClick = async (e) => {
    const { email, password } = form;
    await e.preventDefault();
    dispatch(postSignUp({ email, password }));
  };

  useEffect(() => {
    if (status === "postSignUp/COMPLETE") {
      alert("회원가입 성공");
      navigate("/signin");
    }
  }, [status]);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={OnChange}
      onClick={onClick}
      //유효성 검사 관련 props
      isValid={isValid}
      emailMessage={emailMessage}
      pwMessage={pwMessage}
      pwConfirmMessage={pwConfirmMessage}
    />
  );
};

export default SignupForm;
