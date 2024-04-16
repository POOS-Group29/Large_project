import clsx from "clsx";
import React from "react";

import { Spinner } from "../Spinner";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500  focus-visible:outline-blue-600",
  inverse:
    "bg-white text-black border border-gray-300 hover:bg-gray-100 focus-visible:outline-gray-300",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-2 text-md",
  lg: "px-8 py-3 text-lg",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex justify-center items-center font-semibold leading-6 border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2" data-testid="button-text">
          {props.children}
        </span>{" "}
        {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
