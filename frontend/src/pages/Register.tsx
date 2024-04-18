import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTPError } from "ky";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";
import { Button } from "../components/Button";
import { PasswordRequirements } from "../components/PasswordRequirements";
import { ROUTES } from "../config/routes";
import { API } from "../lib/ky";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine((password) => {
      return [
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[!@#$%^&*]/.test(password),
      ].every(Boolean);
    }),
  name: z.string().min(3),
});

const defaultValues = {
  email: "",
  password: "",
  name: "",
};

export default function Register() {
  const [message, setMessage] = useState({ message: "", isError: false });

  const methods = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const password = watch("password");

  const onSubmit = handleSubmit((values) => {
    API.auth
      .signUp(values)
      .then(() => {
        setMessage({
          message: "Account created successfully!",
          isError: false,
        });
      })
      .catch((error) => {
        if (error instanceof HTTPError) {
          if (error.response?.status === 400) {
            setMessage({
              message: "Email already exists",
              isError: true,
            });
          } else {
            setMessage({
              message: "An error occurred. Please try again later.",
              isError: true,
            });
          }
        }
        console.error(error);
      });
  });

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-16 w-auto"
                src="/scubadiver.jpeg"
                alt="Scuparadise"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register for an account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Already a member?{" "}
                <Link
                  to={ROUTES.SIGN_IN}
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
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
                      htmlFor="fullname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name")}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("password")}
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />

                      <PasswordRequirements
                        password={password}
                        isDirty={dirtyFields.password}
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={onSubmit}
                      isLoading={isSubmitting}
                      className="w-full"
                    >
                      Register
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
