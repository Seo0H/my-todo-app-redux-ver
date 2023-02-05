import AuthTemplate from "../components/auth/AuthTemplate";
import LoginForm from './../containers/auth/LoginForm';

const AuthPage = (type) => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default AuthPage;
