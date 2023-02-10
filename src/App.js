import { Route, Routes, Navigate } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const JWT = localStorage.getItem("access_token") ? true : false;

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
