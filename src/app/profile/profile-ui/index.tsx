"use client";
import { useState } from "react";
import ProfileEditForm from "../profile-edit-form";

// Define the types for the user info structure
type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
};

type User = {
  user: {
    info: UserInfo;
    jwtToken: string;
  };
};

type ProfileUIProps = {
  user: User;
};

export default function ProfileUI({ user }: ProfileUIProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="">
      <div className="mb-8 border border-gray-300 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          {/* Avatar */}
          <div className="w-32 h-32 mb-4 md:mb-0 mr-5 rounded-full bg-blue-200 text-blue-500 flex items-center justify-center text-4xl font-semibold shadow-md">
            {`${user?.user?.info?.firstName?.[0]}${user?.user?.info?.lastName?.[0]}`}
          </div>

          {/* User Details */}
          <div className="mt-4 md:mt-0 space-y-4 text-center md:text-start">
            <h2 className="text-xl font-semibold text-gray-800">
              {`${user?.user?.info?.firstName} ${user?.user?.info?.lastName}`}
            </h2>

            <p className="text-gray-600 text-sm !mt-1">
              <span className="font-bold">Email:</span>{" "}
              <span className="text-gray-800 font-medium">
                {user?.user?.info?.email || "N/A"}
              </span>
            </p>

            <div className="mt-6">
              <button
                onClick={toggleEdit}
                className="px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && <ProfileEditForm user={user} />}
    </div>
  );
}
