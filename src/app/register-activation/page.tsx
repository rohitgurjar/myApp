"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { showToast } from "../components/toaster";

const RegisterActivation = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || ""; // Provide a default empty string

  // Replace spaces with "+" only if token is not empty
  const tokens = token ? token.replace(/\s+/g, "+") : "";

  useEffect(() => {
    if (tokens) {
      fetch(
        `http://172.16.1.130/api/v1/Auth/activate?ActivationToken=${tokens}`
      )
        .then(() => showToast("User Account Activated Successfully", "success"))
        .catch((error) => showToast(error, "error"));
    }
  }, [tokens]);

  return <div>Register Activation</div>;
};

export default RegisterActivation;
