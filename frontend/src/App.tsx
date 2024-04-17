import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Spinner } from "./components/Spinner";
import { ROUTES } from "./config/routes";
import { useAuthStore } from "./lib/zustand";

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const LocationDetails = lazy(() => import("./pages/Admin/LocationDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));

const App = () => {
  const { user } = useAuthStore();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen w-full">
          <Spinner />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default App;
