import AuthTemplate from "../components/auth/AuthTemplate";
import SignupForm from './../containers/auth/SignupForm';

const SigninPage = () => {
  return (
    <AuthTemplate>
      <SignupForm />
    </AuthTemplate>
  );
};

export default SigninPage;
