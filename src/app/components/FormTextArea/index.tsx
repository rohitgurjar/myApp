import React from "react";

interface TextareaProps {
  name: string;
  label: string;
  placeholder: string;
  rows?: number; // Optional rows with default of 4
  required?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>; // Adjusting for textarea
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>; // Adjusting for textarea
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  placeholder,
  rows = 4, // Default value for rows is 4
  required = false,
  value,
  onChange,
  error,
  touched,
  disabled,
  onBlur,
}) => {
  return (
    <div className="mb-4">
      {/* Label */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span>*</span>}
      </label>

      {/* Textarea */}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        rows={rows} // This will ensure at least 4 rows are shown
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`!min-h-[60px] mt-1 block w-full p-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
      />

      {/* Error message */}
      {error && touched && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

export default Textarea;
