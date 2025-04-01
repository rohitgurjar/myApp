"use client";

import { signIn } from "next-auth/react";
import LoginForm from "./login-form";
import { showToast } from "../components/toaster";

export default function Login() {
  return (
    <>
      <LoginForm
        onSubmit={async (formData) => {
          const { email, password } = formData;

          const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // Prevent auto-redirect to handle it manually
          });

          if (result?.error) {
            console.error("Login error:", result.error);
            // alert("Invalid credentials. Please try again.");
            showToast(result?.error, "error");
          } else if (result?.ok) {
            // Redirect to my-reminder on successful login
            showToast("Login successfully", "success");
            window.location.href = "/my-reminder";
          }
        }}
      />
    </>
  );
}
