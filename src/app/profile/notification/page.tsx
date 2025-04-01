"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Notification = ({ token, profileData }: any) => {
  const firstReminderOptions = [
    { key: "1 day before", value: 1 },
    { key: "2 days before", value: 2 },
    { key: "3 days before", value: 3 },
    { key: "4 days before", value: 4 },
    { key: "5 days before", value: 5 },
  ];

  const secondReminnderOptions = [
    { key: "Same day", value: 0 },
    { key: "1 day before", value: 1 },
    { key: "2 days before", value: 2 },
    { key: "3 days before", value: 3 },
    { key: "4 days before", value: 4 },
    { key: "5 days before", value: 5 },
  ];

  const [open, setIsOpen] = useState(false);
  const [firstReminder, setFirstReminder] = useState<number | string>(
    profileData.firstReminder
  );
  const [secondReminder, setSecondReminder] = useState<number | string>(
    profileData.secondReminder
  );

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  const handleSubmit = async () => {
    const response = await fetch(
      "http://172.16.1.130/api/v1/Account/UpdateUserSetting",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailNotification: true,
          pushNotification: true,
          isNewsAndOffers: true,
          firstReminder: firstReminder,
          secondReminder: secondReminder,
          reminderAcknowledgedStatus: true,
        }),
      }
    );
  };

  useEffect(() => {
    if (firstReminder !== 0 || secondReminder !== 0) {
      handleSubmit();
    }
  }, [firstReminder, secondReminder]); // Runs only when firstReminder or secondReminder changes

  const handleChangeFirst = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFirstReminder(event.target.value);
  };

  const handleChangeSecond = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSecondReminder(event.target.value);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="flex justify-between items-center text-black mt-10 bg-gray-50 border w-[35rem] px-4 py-4">
        <div className="w-20 p-6">
          <Image
            src="/images/notification.svg"
            alt="Notification"
            height={50}
            width={50}
            className="h-full w-full"
          />
        </div>
        <div className="cursor-pointer" onClick={toggle}>
          <h2 className="font-semibold">Reminders</h2>
          {/* <p>{firstReminder !== "" ? secondReminder : "N/A"}</p> */}
        </div>
        <div>
          <div
            className="w-20 p-7 ml-8 cursor-pointer transform transition-transform ease-out duration-700"
            onClick={toggle}
          >
            <Image
              src="/images/down-arrow.svg"
              alt="Toggle"
              height={50}
              width={50}
              className={`h-full w-full ${open ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>
      </div>

      {open && (
        <div className="flex text-black gap-10 justify-center items-center bg-gray-50 border w-[35rem] px-4 py-4">
          <div>
            <label className="block">First Reminder</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={firstReminder}
              onChange={handleChangeFirst}
            >
              <option value="" disabled>
                Select a reminder
              </option>
              {firstReminderOptions.map((days) => (
                <option key={days.value} value={days.value}>
                  {days.key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Second Reminder</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={secondReminder}
              onChange={handleChangeSecond}
            >
              <option value="" disabled>
                Select a reminder
              </option>
              {secondReminnderOptions.map((days) => (
                <option key={days.value} value={days.value}>
                  {days.key}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
