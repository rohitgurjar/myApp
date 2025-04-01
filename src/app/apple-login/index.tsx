import { signIn } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

interface AppleLoginResponse {
  account: {
    accessToken: string | unknown;
    email: string;
  };
  error?: string;
}

const AppleLogin: React.FC = () => {
  const handleAppleLogin = async () => {
    try {
      // Trigger the Apple login flow and handle the response
      const response = (await signIn("apple", { redirect: false })) as unknown;

      // Narrow the type after casting to 'unknown'
      const appleLoginResponse = response as AppleLoginResponse | undefined;

      if (appleLoginResponse?.error) {
        console.error("Apple login failed:", appleLoginResponse.error);
        return;
      }

      const { accessToken, email } = appleLoginResponse?.account || {};

      if (accessToken && email) {
        // Send the payload to your API
        const payload = {
          accessToken: accessToken,
          email: email,
          isapplogin: true, // Set this to true if it's an Apple login
        };

        const apiResponse = await axios.post(
          "https://dev-api.whytelion.com/ticketsirdotnet/api/v1/Account/AppleAuth",
          payload
        );

        // Handle API success response (e.g., store tokens, redirect, etc.)
      }
    } catch (error) {
      console.error("Error during Apple login:", error);
    }
  };

  return (
    <button
      onClick={handleAppleLogin}
      className="flex items-center justify-center border border-gray-300 text-black w-[140px] rounded-md p-2 cursor-pointer text-sm md:text-base hover:bg-gray-100"
    >
      <Image
        src="/apple-store.svg"
        alt="Apple logo"
        width={20} // Specify width
        height={20} // Specify height
        className="mr-2"
      />
      Apple
    </button>
  );
};

export default AppleLogin;
