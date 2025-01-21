"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  // Function to check if the link is active
  const isActive = (path: string) => window.location.pathname === path;

  return (
    <header className="bg-gray-800 text-white px-8">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-400">
            RG
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-5 md:space-x-9">
            {session ? (
              <>
                <li
                  className={`hover:text-gray-400 text-sm ${
                    isActive("/dashboard") ? "border-b-2 border-white" : ""
                  }`}
                >
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li
                  className={`hover:text-gray-400 text-sm ${
                    isActive("/profile") ? "border-b-2 border-white" : ""
                  }`}
                >
                  <Link href="/profile">Profile</Link>
                </li>
                <li className="hover:text-gray-400 text-sm">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li
                  className={`hover:text-gray-400 text-sm ${
                    isActive("/login") ? "border-b-2 border-white" : ""
                  }`}
                >
                  <Link href="/login">Login</Link>
                </li>
                <li
                  className={`hover:text-gray-400 text-sm ${
                    isActive("/register") ? "border-b-2 border-white" : ""
                  }`}
                >
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
