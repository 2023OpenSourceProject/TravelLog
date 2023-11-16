import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/UI/Navbar";
import MainPage from "./components/MainPage";
import NewPlan from "./components/Plan/NewPlan";
import NotFound from "./components/UI/NotFound";
import FindPwdForm from "./components/Account/FindPwdForm";
import LoginForm from "./components/Account/LoginForm";
import RegisterForm from "./components/Account/RegisterForm";
import NewReview from "./components/TravelReview/NewReview.jsx";
import ReadReview from "./components/TravelReview/ReadReview.jsx";
import ReviewList from "./components/TravelReview/ReviewList.jsx";
import Mypage from "./components/Mypage/Mypage.jsx";

function App() {
  const [user, setUser] = useState(null);



  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage user={user} setUser={setUser} />}></Route>
        <Route path="/NewPlan/*" element={ <NewPlan />}></Route>
        <Route path="/Account/FindPwd" element={<FindPwdForm />}></Route>
        <Route path="/Account/Login" element={<LoginForm />}></Route>
        <Route path="/Account/Register" element={<RegisterForm />}></Route>
        <Route path="/WriteReview" element={<NewReview />}></Route>
        <Route path="/ReviewList" element={<ReviewList />}></Route>
        <Route path="/ReadReview" element={<ReadReview />}></Route>
        <Route path="/MyPage" element={<Mypage />}></Route>

        <Route path="*" element={<NotFound/>}></Route>

      </Routes>
    </BrowserRouter>
    </>


  );
}

export default App;
