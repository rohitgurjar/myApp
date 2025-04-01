"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import ForgotPasswordDialog from "@/app/components/forgot-password-dialog";
import FormInput from "@/app/components/FormInput";
import PasswordFormInput from "@/app/components/PasswordFormInput";
import GoogleLogin from "@/app/google-login";
import AppleLogin from "@/app/apple-login";

interface SignInValues {
  email: string;
  password: string;
  isAppuser: boolean;
}

interface LoginFormProps {
  onSubmit: (values: SignInValues) => Promise<void>;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const formik = useFormik<SignInValues>({
    initialValues: {
      email: "",
      password: "",
      isAppuser: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <div className="container mx-auto py-5 px-4">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <div className="flex items-center justify-between">
            <GoogleLogin />
            <AppleLogin />
          </div> */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
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
              <PasswordFormInput
                label="Password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
                touched={formik.touched.password}
                required
              />
            </div>

            <div>
              <button
                disabled={formik.isSubmitting}
                type="submit"
                className={`flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600  ${
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
                    <span>Signing in...</span>
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 mb-5 text-sm">
            Don’t have an account?
            <Link
              href="/register"
              className="pl-4 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>

          <div className="flex justify-between">
            <p className="text-sm">
              <Link href="/resend-activation-email">
                Resend Activation Email
              </Link>
            </p>

            <p className="text-sm">
              <button type="button" onClick={openDialog}>
                Forgot password?
              </button>
            </p>
          </div>
        </div>
      </div>

      {isDialogOpen && <ForgotPasswordDialog closeDialog={closeDialog} />}
    </div>
  );
};

export default LoginForm;
