import React from "react";
import { auth } from "@/auth";

export default async function Footer() {
  const user = await auth();

  return (
    <footer id="contact" className="bg-[#e9e8e2] text-white py-8">
      <div className="container mx-auto px-6">
        <div>
          <div>
            <p className="text-lg font-semibold text-black">Remindify</p>
            <p className="text-sm text-black">
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
