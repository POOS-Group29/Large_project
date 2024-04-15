import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "../components/Button";
import { ROUTES } from "../config/routes";
import { API } from "../services";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") || "");
  const token = decodeURIComponent(searchParams.get("token") || "");

  const [message, setMessage] = useState({ message: "", isError: false });
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

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

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email,
      token,
    },
  });

  const onSubmit = handleSubmit(async () => {
    try {
      await API.auth.verifyEmail({
        email,
        token,
      });
      setMessage({ message: "Email verified", isError: false });
      setRedirect(true);
    } catch (error) {
      console.error(error);
      setMessage({ message: "An error occurred", isError: true });
    }
  });

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Verify your email
              </h2>
            </div>

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

            <div className="mt-4">
              <div>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={email || ""}
                      disabled
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                      placeholder={email || ""}
                    />
                  </div>

                  <div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={onSubmit}
                      disabled={isSubmitting}
                    >
                      Verify email
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/auth_bg.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
