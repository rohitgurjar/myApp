// components/GoogleLoginButton.tsx
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

// Define the payload structure for the external API
interface GoogleAuthPayload {
  access_token: string;
  isapplogin: boolean;
}

const GoogleLogin = () => {
  const { data: session, status } = useSession();


  // Handle Google login
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: window.location.href });
  };

  // After the session is updated, send the access token to the external API
  useEffect(() => {
    if (session?.user?.access_token) {
      const access_token = session.user.access_token;
      const isapplogin = false; // Adjust based on your logic

      const payload: GoogleAuthPayload = {
        access_token,
        isapplogin,
      };

      // Send the payload to the external API
      fetch(
        "https://dev-api.whytelion.com/ticketsirdotnet/api/v1/Account/GoogleAuth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
        })
        .catch((error) => {
          console.error("Error calling API:", error);
        });
    }
  }, [session]);

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center border border-gray-300 text-black w-[140px] rounded-md p-2 cursor-pointer text-sm md:text-base hover:bg-gray-100"
    >
      <img src="/google-icon.svg" alt="Google logo" className="w-5 h-5 mr-2" />
      Google
    </button>
  );
};

export default GoogleLogin;
