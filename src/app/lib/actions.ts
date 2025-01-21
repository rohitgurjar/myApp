"use server";

import axios from "axios";

export const authenticatess = async ({
  email,
  password,
}: {
  email: string | undefined | any;
  password: string | undefined | any;
}) => {
  try {
    const response = await axios.get(
      `https://dev-api.whytelion.com/ticketsirdotnet/api/v1/Account/VerifyUser`,
      {
        params: {
          email,
          password,
          isAppuser: false,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Or whatever you want to return from the response
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};
