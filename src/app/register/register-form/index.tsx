"use client"; // Add this to make it a client-side component

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import FormInput from "@/app/components/FormInput";
import SelectDropdown from "@/app/components/SelectInput";
import Link from "next/link";

type Country = {
  value: string;
  label: string;
};

type genderType = {
  value: string;
  label: string;
};

interface SignInValues {
  email: string;
  password: string;
  isAppuser: boolean;
  country: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  confirmPassword: string;
}

const CountryData: Country[] = [
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
];

const genderData: genderType[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.string().required("Country is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterForm: React.FC = () => {
  const formik = useFormik<SignInValues>({
    initialValues: {
      country: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAppuser: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://dev-api.whytelion.com/ticketsirdotnet/api/v1/Account/UserRegistration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values), // Send form data as JSON
          }
        );

        if (!response.ok) {
          throw new Error("Failed to register user.");
        }

        const data = await response.json();

        if (data.isEmailExists) {
          alert("Error: Email is already exist");
        }

        if (!data.isEmailExists) {
          alert(data.message);
        }
        // Handle the response (e.g., redirect to login or show success message)
      } catch (error) {
        console.error("Error during registration:", error);
        alert(error);

        // Handle the error (e.g., show error message)
      }
    },
  });

  return (
    <div className="container mx-auto py-5 px-4">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="sm:col-span-3">
              <SelectDropdown
                label="Country"
                id="country"
                name="country"
                options={CountryData}
                onChange={formik.handleChange}
                value={formik.values.country}
                error={formik.errors.country}
                touched={formik.touched.country}
                required
              />
            </div>

            <div>
              <FormInput
                label="First Name"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                error={formik.errors.firstName}
                touched={formik.touched.firstName}
                required
              />
            </div>

            <div>
              <FormInput
                label="Middle Name"
                type="text"
                id="middleName"
                name="middleName"
                placeholder="Enter your middle name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.middleName}
                error={formik.errors.middleName}
                touched={formik.touched.middleName}
              />
            </div>

            <div>
              <FormInput
                label="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={formik.errors.lastName}
                touched={formik.touched.lastName}
                required
              />
            </div>

            <div className="sm:col-span-3">
              <SelectDropdown
                label="Gender"
                id="gender"
                name="gender"
                options={genderData}
                onChange={formik.handleChange}
                value={formik.values.gender}
                error={formik.errors.gender}
                touched={formik.touched.gender}
                required
              />
            </div>

            <div>
              <FormInput
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik.touched.email}
                required
              />
            </div>

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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                onChange={formik.handleChange}
                value={formik.values.isAppuser ? "true" : "false"}
              />
              <label
                htmlFor="checkbox"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Subscribe to our newsletter
              </label>
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
                    <span>Create Account...</span>
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <p className="my-5 text-sm ">
            Already have an account?
            <Link
              href="/login"
              className="pl-4 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
