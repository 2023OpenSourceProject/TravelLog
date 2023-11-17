import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";


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

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/NewPlan/*" element={<NewPlan />}></Route>
        <Route path="/FindPwd" element={<FindPwdForm />}></Route>
        <Route path="/Login" element={<LoginForm />}></Route>
        <Route path="/Register" element={<RegisterForm />}></Route>
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
