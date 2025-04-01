import { auth } from "@/auth";
import AddReminder from "./add-reminder";
import ReminderList from "./add-reminder/reminder-list";

async function getReminders() {
  try {
    const user = await auth();

    const response = await fetch(
      `http://172.16.1.130/api/v1/Reminder/GetReminderList?pageNo=1&pageSize=20`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.user?.jwtToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reminders");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }
}

export default async function Dashboard() {
  const reminders = await getReminders(); // Fetch data on the server
  const user = await auth();

  return (
    <>
      <div className="bg-[#476472] py-4">
        <h1 className="text-center text-white text-2xl">My Reminders</h1>
      </div>

      <div className="container mx-auto py-5 px-4">
        <AddReminder token={user?.user?.jwtToken} />
        <ReminderList reminderData={reminders} token={user?.user?.jwtToken} />
      </div>
    </>
  );
}
