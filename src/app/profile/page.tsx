import { auth } from "@/auth";
import Tabing from "../components/tabing";
import Account from "./account/page";
import EmailSetting from "./email-setting/page";
import ChangePassword from "./change-password/page";
import Notification from "./notification/page";

async function getUserProfile(userId: string, token: string) {
  try {
    const response = await fetch(
      `http://172.16.1.130/api/v1/Account/GetUserProfile?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null; // Return null to prevent crashes
  }
}

export default async function Profile() {
  const user = await auth();

  if (!user) {
    return (
      <div className="sm:container mx-auto p-8 text-center">
        <p className="text-red-500">Please log in to view your profile.</p>
      </div>
    );
  }

  const profileData = await getUserProfile(
    user.user?.userId,
    user.user?.jwtToken
  );

  const tabNames = [
    { id: 0, description: "Account" },
    // { id: 1, description: "Email" },
    { id: 1, description: "Notification" },
    { id: 2, description: "Change Password" },
  ];

  const tabContent = [
    <Account
      key="account"
      token={user.user?.jwtToken}
      userId={user.user?.userId}
      profileData={profileData.data}
    />,
    // <EmailSetting key="emailSetting" />,
    <Notification
      key="notification"
      token={user.user?.jwtToken}
      profileData={profileData.data}
    />,
    <ChangePassword key="changePassword" token={user.user?.jwtToken} />,
  ];

  return (
    <div className="sm:container mx-auto p-8">
      <Tabing tabs={tabNames} content={tabContent} />
    </div>
  );
}
