"use client";

import { signIn } from "next-auth/react";
import LoginForm from "./login-form";

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
            alert("Invalid credentials Please try again.");
          } else if (result?.ok) {
            // Redirect to dashboard on successful login
            window.location.href = "/dashboard";
          }
        }}
      />
    </>
  );
}
