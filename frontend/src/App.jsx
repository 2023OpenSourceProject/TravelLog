import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import MainPage from "./components/MainPage";
import NewPlan from "./components/Plan/NewPlan";
import NotFound from "./components/UI/NotFound";
import FindPwdForm from "./components/Account/FindPwdForm";
import LoginForm from "./components/Account/LoginForm";
import RegisterForm from "./components/Account/RegisterForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/NewPlan/*" element={<NewPlan />}></Route>
          <Route path="/Account/FindPwd" element={<FindPwdForm />}></Route>
          <Route path="/Account/Login" element={<LoginForm />}></Route>
          <Route path="/Account/Register" element={<RegisterForm />}></Route>
          <Route path="*" element={<NotFound/>}></Route>

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
