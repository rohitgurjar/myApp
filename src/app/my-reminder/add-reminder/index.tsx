"use client";
import React, { useState, useEffect, useRef } from "react";
import AddReminderForm from "./add-reminder-form";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

async function getReminders(token: string) {
  try {
    const response = await fetch(
      `http://172.16.1.130/api/v1/Static/GetReminderCategoryList`,
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
      throw new Error("Failed to fetch reminders");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }
}

interface AddReminderProps {
  token: string;
}

const AddReminder: React.FC<AddReminderProps> = ({ token }) => {
  const [reminders, setReminders] = useState<any[]>([]);
  const [opendropdown, setOpendropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [reminderCategoryId, setReminderCategoryId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchText") || ""
  );

  useEffect(() => {
    async function fetchReminders() {
      const data = await getReminders(token);
      setReminders(data.data);
    }

    fetchReminders();
  }, [token]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("searchText", searchTerm);
    } else {
      params.delete("searchText");
    }
    router.push(`?${params.toString()}`);
  };

  const handleOpen = (reminderCategoryId: any) => {
    setOpendropdown(false);
    setReminderCategoryId(reminderCategoryId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleShow = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpendropdown((prevShow) => !prevShow);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpendropdown(false);
    }
  };

  useEffect(() => {
    if (opendropdown) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Enable scroll
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = ""; // Ensure scroll is enabled when component unmounts
    };
  }, [opendropdown]);

  return (
    <div>
      <div className="border-b bg-white p-4 flex flex-col gap-2 mb-5">
        {/* Top Controls */}
        <div className="flex justify-between items-center">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex justify-center relative"
          >
            <input
              type="text"
              placeholder="Search reminders"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 pl-10 rounded-full w-96 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <Image
                src="/images/search.svg"
                alt="Search"
                width={20}
                height={20}
              />
            </button>
          </form>

          <div className="flex gap-3" ref={dropdownRef}>
            <button
              onClick={toggleShow}
              className="relative bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700"
            >
              ADD REMINDER
            </button>

            {opendropdown && (
              <div className="shadow-2xl absolute right-[9px] mt-1 bg-white text-black p-2 rounded-lg w-[200px]">
                <ul className="flex flex-col space-y-4">
                  {reminders.map((item) => (
                    <li
                      key={item.reminderCategoryId}
                      className="hover:bg-green-400 hover:text-white p-2 rounded-md"
                    >
                      <button
                        onClick={() => handleOpen(item)}
                        className="hover:bg-green-400 hover:text-white rounded-md w-full text-left"
                      >
                        {item.reminderCategoryDescription}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <AddReminderForm
          handleClose={handleClose}
          reminderCategoryId={reminderCategoryId}
          token={token}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default AddReminder;
