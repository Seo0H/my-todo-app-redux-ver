import AuthForm from "../../components/auth/AuthForm";
import { useEffect } from "react";

const LoginForm = () => {
  const form = {
    form: "login",
  };

  // inpute onChnage handler
  const onChange = (e) => {
     const { value, name } = e.target;
     console.log(value);
  };

  // for Submit handler
  const onSubmit = (e) => {
    e.preventDefault();
  };

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    form.email = "";
    form.password = "";
  },[]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
