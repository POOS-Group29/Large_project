import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./config/routes";
import { useAuthStore } from "./lib/zustand";

import Admin from "./pages/Admin";
import LocationDetails from "./pages/Admin/LocationDetails";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {user?.isAdmin ? (
          <>
            <Route path={ROUTES.ADMINISTRATION} element={<Admin />} />
            <Route
              path={ROUTES.LOCATION_DETAIL}
              element={<LocationDetails />}
            />
          </>
        ) : (
          <Route path={ROUTES.DASHBOARD} index element={<Home />} />
        )}
        <Route path={ROUTES.VERITY_EMAIL} element={<VerifyEmail />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTES.SIGN_IN} index element={<Login />} />
        <Route path={ROUTES.SIGN_UP} index element={<Register />} />
        <Route path="*" element={<Navigate to={ROUTES.SIGN_IN} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
