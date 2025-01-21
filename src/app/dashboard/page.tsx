import { auth } from "@/auth";

export default async function Dashboard() {
  const user = await auth();

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

        {/* User Info */}
        <div className="space-y-2">
          <p className="text-lg text-gray-700">
            <strong>Welcome back,</strong> {user?.user?.name || "User"}!
          </p>
          <p className="text-sm text-gray-600">
            You are logged in and have access to the dashboard. From here, you
            can manage your account, settings, and more.
          </p>
          <p className="text-sm text-gray-600">
            You are logged in and have access to the dashboard. From here, you
            can manage your account, settings, and more.
          </p>
          <p className="text-sm text-gray-600">
            You are logged in and have access to the dashboard. From here, you
            can manage your account, settings, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
