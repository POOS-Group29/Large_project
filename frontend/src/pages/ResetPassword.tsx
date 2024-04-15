import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "../config/ky";
import { ROUTES } from "../config/routes";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [message, setMessage] = useState({ message: "", isError: false });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Get the token from the URL
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setMessage({
        message: "Passwords do not match",
        isError: true,
      });
    } else {
      setMessage({
        message: "",
        isError: false,
      });
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (redirect) {
      let count = 3;
      setInterval(() => {
        setMessage({
          message: `Redirecting in ${count}...`,
          isError: false,
        });
        count--;
        if (count < 0) {
          navigate(ROUTES.SIGN_IN);
        }
      }, 1000);
    }
  }, [navigate, redirect]);

  // Handle the form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage({
        message: "Invalid token",
        isError: true,
      });
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        message: "Passwords do not match",
        isError: true,
      });
      return;
    }

    const response = await baseInstance.post("auth/reset-password", {
      json: {
        token,
        newPassword,
      },
    });

    if (response.ok) {
      setMessage({
        message: "Password reset successfully",
        isError: false,
      });
      setRedirect(true);
    } else {
      setMessage({
        message: "Error resetting password",
        isError: true,
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          {message.message &&
            (message.isError ? (
              <div className="rounded-md bg-red-50 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium leading-5 text-red-800">
                      {message.message}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-green-50 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium leading-5 text-green-800">
                      {message.message}
                    </h3>
                  </div>
                </div>
              </div>
            ))}

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
