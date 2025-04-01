"use client";

import React, { useState, useRef, useEffect } from "react";
import AddReminderForm from "../add-reminder-form";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/components/toaster";

function ReminderList({ reminderData, token }: any) {
  const [open, setOpen] = useState(false);
  const [reminderListData, setReminderListData] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [reminderOnOff, setReminderOnOff] = useState(false);
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (reminder: any) => {
    setOpen(true);
    setReminderListData(reminder);
  };

  const toggleShow = (event: React.MouseEvent, reminderId: string) => {
    event.stopPropagation();
    setOpenDropdownId((prevId) => (prevId === reminderId ? null : reminderId));
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setOpenDropdownId(null);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const handleDelete = async (reminderId: string) => {
    try {
      const response = await fetch(
        `http://172.16.1.130/api/v1/Reminder/DeleteReminder?reminderId=${reminderId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Soft refresh page to refetch data
        showToast("Your reminder deleted successfully", "success");
        router.refresh();
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
      showToast(error, "error");
    }
  };

  const handleToggleReminder = (reminderId: string) => {
    setReminderOnOff((prev) => {
      const newState = !prev; // Compute new state
      handleReminderOnOff(reminderId, newState); // Pass updated state
      return newState; // Update the state
    });
  };

  const handleReminderOnOff = async (
    reminderId: string,
    reminderOnOff: boolean
  ) => {
    try {
      const response = await fetch(
        `http://172.16.1.130/api/v1/Reminder/TurnOffONReminder?reminderId=${reminderId}&turnOffReminder=${reminderOnOff}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Soft refresh page to refetch data
        showToast("Your reminder deleted successfully", "success");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating reminder:", error);
      showToast("Failed to update reminder", "error");
    }
  };

  return (
    <div>
      {reminderData.data.length === 0 ? (
        <p className="py-5 text-center">No reminders found.</p>
      ) : (
        reminderData.data.map((reminder: any) => {
          return (
            <div
              key={reminder.reminderId}
              className="flex items-center justify-between bg-white shadow-md rounded-lg px-4 py-6 border mb-4 "
            >
              <div className="flex items-center space-x-4">
                <div
                  className="bg-yellow-500 w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer"
                  onClick={() => handleOpen(reminder)}
                >
                  🎂
                </div>
                <div>
                  <p className="text-gray-600 text-lg font-semibold">
                    {reminder.age}
                  </p>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-lg">
                    {reminder.userName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {reminder.emailAddress}
                  </p>
                </div>
              </div>
              <div className="text-sm">
                {new Date(reminder.reminderDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                <span>(age {reminder.age})</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
                  SEND A CARD
                </button>
                <button
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  onClick={() => handleToggleReminder(reminder.reminderId)}
                >
                  {reminder.turnOffReminder ? "🔔" : "🔕"}
                </button>

                <div ref={dropdownRef}>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={(e) => toggleShow(e, reminder.reminderId)}
                  >
                    ⋮
                  </button>
                </div>
                {openDropdownId === reminder.reminderId && (
                  <div className="absolute right-[9px] mt-1 bg-white text-black p-2 rounded-lg w-[200px] shadow-2xl z-[100]">
                    <ul className="flex flex-col space-y-4">
                      <li className="hover:bg-green-400 hover:text-white p-2 rounded-md">
                        <button
                          className="hover:bg-green-400 hover:text-white rounded-md w-full text-left"
                          onClick={() => handleDelete(reminder.reminderId)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}

      {open && (
        <AddReminderForm
          handleClose={handleClose}
          reminderCategoryId={reminderListData}
          token={token}
          setIsOpen={setOpen}
          reminderListData={reminderListData}
        />
      )}
    </div>
  );
}

export default ReminderList;
