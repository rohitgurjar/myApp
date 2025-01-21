import { useState } from "react";

interface PasswordInputProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const PasswordFormInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  placeholder,
  error,
  touched,
  value,
  onChange,
  id,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span>*</span>}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm relative ${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
      />
      {error && touched && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={`absolute right-3 ${
          error && touched ? "top-[48%]" : "top-[67%]"
        } transform -translate-y-1/2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              showPassword
                ? "M15 12c0 3.866-3.134 7-7 7s-7-3.134-7-7 3.134-7 7-7 7 3.134 7 7z"
                : "M2.458 12C3.732 7.943 7.766 5 12 5c4.034 0 7.504 2.745 8.743 6.56a9.973 9.973 0 0 1 0 1.88c-1.238 3.816-4.728 6.56-8.743 6.56-4.234 0-8.268-2.943-9.542-7.001A9.974 9.974 0 0 1 12 12z"
            }
          />
        </svg>
      </button>
    </div>
  );
};

export default PasswordFormInput;
