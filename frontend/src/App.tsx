import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import { ROUTES } from "./config/routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTES.SIGN_IN} index element={<Login />} />
          <Route path={ROUTES.SIGN_UP} index element={<Register />} />
          <Route path="*" element={<Navigate to={ROUTES.SIGN_IN} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
