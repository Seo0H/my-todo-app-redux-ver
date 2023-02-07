import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import TestPage from './test/Test';

function App() {
  //JWT 확인 로직 만들기
  //JWT 인증 X -> /signup
  //JWT 인증 O -> /todo
  const JWT = false;

  return (
    <Routes>
      <Route
        path="/"
        element={JWT ? <Navigate to="/todo" /> : <Navigate to="/signup" />}
      />

      <Route path="/signup" element={<AuthPage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
