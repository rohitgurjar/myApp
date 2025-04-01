"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordFormInput from "@/app/components/PasswordFormInput";
import { showToast } from "@/app/components/toaster";

interface changePassword {
  existingpass: string;
  newPass: string;
  confirmPassword: string;
}

interface changePasswordProps {
  token: string;
}

const validationSchema = Yup.object({
  existingpass: Yup.string().required("Current Password is required"),
  newPass: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .test("confirmPassword", "Passwords must match", (value, context) => {
      return context.parent.newPass === value;
    }),
});

const ChangePassword: React.FC<changePasswordProps> = ({ token }) => {
  const formik = useFormik<changePassword>({
    initialValues: {
      existingpass: "",
      newPass: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          "http://172.16.1.130/api/v1/Account/ChangePassword",
          {
            method: "POST",
            mode: "cors", // Explicitly set CORS mode

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();

        if (data && data.code === 200) {
          showToast(data.data, "success");
          resetForm();
        }
      } catch (error) {
        console.error("Error during registration:", error);
        showToast(error, "error");
      }
    },
  });

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-gray-700 text-3xl font-semibold mb-4">
        Change Password
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <PasswordFormInput
            label="Current Password"
            id="existingpass"
            name="existingpass"
            placeholder="Enter your current password"
            onChange={formik.handleChange}
            value={formik.values.existingpass}
            error={formik.errors.existingpass}
            touched={formik.touched.existingpass}
            required
          />
        </div>

        <div className="mb-4">
          <PasswordFormInput
            label="Password"
            id="newPass"
            name="newPass"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.newPass}
            error={formik.errors.newPass}
            touched={formik.touched.newPass}
            required
          />
        </div>

        <div className="mb-4">
          <PasswordFormInput
            label="Confirm Password"
            id="password"
            name="confirmPassword"
            placeholder="Enter your confirm password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-400 py-3 px-8 rounded-3xl text-white font-bold mt-4 w-full"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
