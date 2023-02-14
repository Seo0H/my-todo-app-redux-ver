import { Route, Routes, Navigate } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TestPage from './pages/TestPage';

function App() {
  const hasJWT = localStorage.getItem("access_token") ? true : false;

  return (
    <Routes>
      <Route
        path="/"
        element={hasJWT ? <Navigate to="/todo" /> : <Navigate to="/signin" />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
