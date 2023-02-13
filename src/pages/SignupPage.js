import BasicTemplate from "../components/common/BasicTemplate";
import SignupForm from "./../containers/auth/SignupForm";
import { Navigate, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const hasJWT = localStorage.getItem("access_token") ? true : false;
  if (hasJWT) {
    return <Navigate to={"/todo"} />
  }

  return (
    <BasicTemplate>
      <SignupForm />
    </BasicTemplate>
  );
};

export default SignupPage;
