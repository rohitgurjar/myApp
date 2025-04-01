"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Header: React.FC = () => {
  const { data: session } = useSession();

  const [opendropdown, setOpendropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [opendropdown]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const firstLetter = session?.user?.name?.charAt(0).toUpperCase();

  return (
    <header className="bg-[#e9e8e2] text-white px-8">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="text-xl font-bold">
          <Link href="/" className="text-black flex">
            <Image
              src="/images/bday.svg"
              alt="Timer"
              width={20}
              height={20}
              className="object-contain mr-2"
            />
            <p>Remindify</p>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-5 md:space-x-9">
            {session ? (
              <>
                <li className="text-sm text-black">
                  <Link href="/my-reminder">My Reminder</Link>
                </li>

                <li className="text-sm text-black" ref={dropdownRef}>
                  <button
                    className="bg-green-400 rounded-full w-7 h-7 overflow-hidden relative"
                    onClick={toggleShow}
                  >
                    {firstLetter}
                  </button>

                  {opendropdown && (
                    <div className="absolute right-[9px] mt-1 bg-white text-black p-2 rounded-lg w-[200px] shadow-2xl z-[100]">
                      <ul className="flex flex-col space-y-4">
                        <Link href="/profile">
                          <li className="hover:bg-green-400 hover:text-white p-2 rounded-md">
                            <button className="hover:bg-green-400 hover:text-white rounded-md w-full text-left">
                              Account Setting
                            </button>
                          </li>
                        </Link>
                        {/* <li className="hover:bg-green-400 hover:text-white p-2 rounded-md">
                          <button className="hover:bg-green-400 hover:text-white rounded-md w-full text-left">
                            Email Setting
                          </button>
                        </li>
                        <li className="hover:bg-green-400 hover:text-white p-2 rounded-md">
                          <button className="hover:bg-green-400 hover:text-white rounded-md w-full text-left">
                            Notification
                          </button>
                        </li>
                        <li className="hover:bg-green-400 hover:text-white p-2 rounded-md">
                          <button className="hover:bg-green-400 hover:text-white rounded-md w-full text-left">
                            Change Password
                          </button>
                        </li> */}
                        <li>
                          <button
                            onClick={handleLogout}
                            className="hover:bg-green-400 hover:text-white p-2 rounded-md w-full text-left"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="text-sm text-black">
                  <Link href="/login">Login</Link>
                </li>
                <li className="text-sm text-black">
                  <Link href="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
