import { auth } from "@/auth";
import Tabing from "../components/tabing";
import ProfileUI from "./profile-ui/index";
import Account from "./account";
import Help from "./help";

export default async function Profile() {
  const user = await auth();

  const tabNames = ["Profile", "Account", "Help"];
  const tabContent = [
    <ProfileUI key="profile" user={user} />,
    <Account key="account" />,
    <Help key="help" />,
  ];

  return (
    <div className="sm:container mx-auto p-8">
      <Tabing tabs={tabNames} content={tabContent} />
    </div>
  );
}
