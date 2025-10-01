import RegisterUser from './components/Register.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login.jsx';
import HomePage from './components/HomePage.jsx';
import Rebate from './components/Rebate.jsx';
import InvestmentPlan from './components/plan.jsx';
import Stack from './components/stack.jsx';
import MySelf from './myself.jsx';
import "./App.css"
import MainLayout from './components/MainLayout.jsx';
import WithdrawPage from './components/withdrawel.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route element={<MainLayout />}>
          <Route path="/myHomePage" element={<HomePage />} />
          <Route path="/rebate" element={<Rebate />} />
          <Route path="/plan" element={<InvestmentPlan />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/myself" element={<MySelf />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
