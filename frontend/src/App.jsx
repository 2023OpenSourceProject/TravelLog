import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import icon from './assets/icon.png';

import MainPage from "./components/MainPage";
import NewPlan from "./components/Plan/NewPlan";
import NotFound from "./components/UI/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/NewPlan/*" element={<NewPlan />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
          <Route path="/account/*"></Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
