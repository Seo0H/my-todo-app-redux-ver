import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function App() {

  return (
      <Routes>
        <Route path='/' element={<AuthPage />}/>
        <Route path='/signup' element={<AuthPage />}/>
      </Routes>
  );
}

export default App;
