import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  //JWT 확인 로직 만들기
  //JWT 인증 X -> /signup
  //JWT 인증 O -> /todo
  const JWT = true ;

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      {/* <Route path='/todo' element={<TodoPage />}/> */}
    </Routes>
  );
}

export default App;
