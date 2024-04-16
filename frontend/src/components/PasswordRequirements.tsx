import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const passwordRequirements = [
  {
    text: "Password must be at least 8 characters long",
    validate: (password: string) => password.length >= 8,
  },
  {
    text: "Password must contain at least one uppercase letter",
    validate: (password: string) => /[A-Z]/.test(password),
  },
  {
    text: "Password must contain at least one number",
    validate: (password: string) => /[0-9]/.test(password),
  },
  {
    text: "Password must contain at least one special character",
    validate: (password: string) => /[!@#$%^&*]/.test(password),
  },
];

interface PasswordRequirementsProps {
  extraRequirements?: {
    text: string;
    validate: (password: string) => boolean;
  }[];
  password: string;
  isDirty: boolean | undefined;
}

export const PasswordRequirements = (props: PasswordRequirementsProps) => {
  const { password, isDirty, extraRequirements } = props;

  const requirements = passwordRequirements.concat(extraRequirements || []);

  return (
    <div className="flex flex-col gap-2 mt-4">
      {requirements.map((requirement, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center gap-2",
            isDirty === undefined
              ? "text-gray-500"
              : requirement.validate(password)
              ? "text-green-500"
              : "text-red-500"
          )}
        >
          {isDirty === undefined ? (
            <CheckCircleIcon className="h-4 w-4 text-gray-500" />
          ) : requirement.validate(password) ? (
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
          )}
          <p className="text-sm">{requirement.text}</p>
        </div>
      ))}
    </div>
  );
};
