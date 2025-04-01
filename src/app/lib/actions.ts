"use server";

import axios from "axios";

export const authenticatess = async ({
  email,
  password,
}: {
  email: string | undefined;
  password: string | undefined;
}) => {
  try {
    const response = await axios.post(
      "http://172.16.1.130/api/v1/Auth/login",
      { email, password }, // Request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};
