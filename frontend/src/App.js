import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" index element={<Login />} />
        <Route path="/signup" index element={<Register />} />
        <Route path="/" index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
