import React from "react";

interface FormInputProps {
  label: string;
  type: string | number;
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value?: string | number | null;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string; // Error as a string
  touched?: boolean; // Touched as a boolean
  disabled?: boolean;
  onBlur: React.FocusEventHandler<HTMLInputElement>; // onBlur as a focus event handler
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  id,
  name,
  placeholder,
  required = false,
  value,
  onChange,
  error,
  touched,
  disabled,
  onBlur,
}) => {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-2 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
        disabled={disabled}
      />
      {error && touched && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

export default FormInput;
