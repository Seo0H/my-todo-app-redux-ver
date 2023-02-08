import BasicTemplate from "../components/common/BasicTemplate";
import SigninForm from "../containers/auth/SigninForm";

const SignupPage = () => {
  return (
    <BasicTemplate whatIsType={"Sign-in"}>
      <SigninForm />
    </BasicTemplate>
  );
};

export default SignupPage;
