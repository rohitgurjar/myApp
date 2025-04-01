import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import FormInput from "../FormInput";

interface props {
  closeDialog: () => void;
}

interface ResendActivationType {
  email: string;
}

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function ResendActivationEmailDialog({ closeDialog }: props) {
  const formik = useFormik<ResendActivationType>({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `http://172.16.1.130/api/v1/Auth/ReSentActivate?email=${values.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        if (responseData.responceCode === 200) {
          alert(responseData.message);
          closeDialog();
        }

        if (responseData.responceCode === 400) {
          alert(responseData.message);
          closeDialog();
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert(error);
      }
    },
  });

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          {/* Heading */}
          <h2 className="text-center text-lg font-semibold text-gray-900">
            Resend Activation Link
          </h2>

          {/* Input Field */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="mt-4">
              <FormInput
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik.touched.email}
                onBlur={formik.handleBlur}
                required
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                disabled={formik.isSubmitting}
                type="submit"
                className={`rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 ${
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
                    <span>Sending...</span>
                  </span>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResendActivationEmailDialog;
