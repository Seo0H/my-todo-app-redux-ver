import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

/**
 * @param Signin = '로그인'
 * @param Signup = '회원가입'
 */
function App() {
  //JWT 확인 로직 만들기
  //JWT 인증 X -> /signup
  //JWT 인증 O -> /todo
  const JWT = false;

  return (
    <Routes>
      <Route
        path="/"
        element={JWT ? <Navigate to="/todo" /> : <Navigate to="/signin" />}
      />

      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
