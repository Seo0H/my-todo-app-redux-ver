import BasicTemplate from "../components/common/BasicTemplate";
import SigninForm from "../containers/auth/SigninForm";
import { Navigate } from 'react-router-dom';

const SigninPage = () => {
  const hasJWT = localStorage.getItem("access_token") ? true : false;
  if (hasJWT) {
    return <Navigate to={"/todo"} />
  }
  return (
    <BasicTemplate>
      <SigninForm />
    </BasicTemplate>
  );
};

export default SigninPage;
