import React from "react";
import { auth } from "@/auth";

export default async function Footer() {
  const user = await auth();

  return (
    <footer id="contact" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div>
          <div>
            <p className="text-lg font-semibold">My App</p>
            <p className="text-sm">
              © {new Date().getFullYear()} {user?.user?.name || "Your Name"}.
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
