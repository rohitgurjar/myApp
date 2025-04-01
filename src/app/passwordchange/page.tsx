"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import FormInput from "../components/FormInput";

interface changePasswordProps {
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordChange = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || ""; // Provide a default empty string

  // Replace spaces with "+" only if token is not empty
  const tokens = token ? token.replace(/\s+/g, "+") : "";

  const formik = useFormik<changePasswordProps>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://172.16.1.130/api/v1/Auth/ConfirmResetPassword",
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: values.password,
              confirmPassword: values.confirmPassword,
              passwordReminderActivationToken: tokens,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        alert("Password reset successful!");
        return data;
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to reset password. Please try again.");
      }
    },
  });

  return (
    <div className="container mx-auto py-5 px-4">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <FormInput
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
            required
          />
        </div>

        <div>
          <FormInput
            label="Confirm password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 ${
              formik.isSubmitting && "cursor-not-allowed"
            }`}
          >
            {formik.isSubmitting ? (
              <span className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Submiting...</span>
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
