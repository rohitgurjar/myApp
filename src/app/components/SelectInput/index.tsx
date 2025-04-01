import React from "react";

interface SelectDropdownProps {
  label: string;
  id: string | number;
  required?: boolean;
  name: string;
  options: {
    value: number | string | undefined;
    label: string;
  }[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  id,
  name,
  options,
  value,
  onChange,
  required = false,
  error,
  touched,
  disabled,
}) => {
  return (
    <div className="mt-4">
      <label
        htmlFor={String(id)}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span>*</span>}
      </label>
      <select
        id={String(id)}
        name={name}
        value={value !== undefined ? String(value) : ""}
        onChange={onChange}
        disabled={disabled}
        className={`mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
      >
        {/* Placeholder option */}
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>

      {error && touched && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

export default SelectDropdown;
