import BasicTemplate from '../components/common/BasicTemplate';
import SignupForm from './../containers/auth/SignupForm';

const SigninPage = () => {
  return (
    <BasicTemplate  whatIsType={"Sign-up"}>
      <SignupForm />
    </BasicTemplate>
  );
};

export default SigninPage;
