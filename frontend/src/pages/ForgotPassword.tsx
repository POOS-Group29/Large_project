import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { Button } from "../components/Button";
import { CommonAPI } from "../config/ky";
import { ROUTES } from "../config/routes";

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

const defaultValues = {
  email: "",
};

export default function ForgotPassword() {
  const [message, setMessage] = useState({ message: "", isError: false });

  const methods = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await CommonAPI.auth.forgotPassword(data.email);
      setMessage({
        message: "If the email exists, you will receive an email",
        isError: false,
      });
    } catch (error) {
      setMessage({
        message: "Something went wrong. Please try again.",
        isError: true,
      });
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
                Forgot your password?
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
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={onSubmit}
                      isLoading={isSubmitting}
                      className="w-full"
                    >
                      Reset password
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <p className="leading-6">
                <Link
                  to={ROUTES.SIGN_IN}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  Back to sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
