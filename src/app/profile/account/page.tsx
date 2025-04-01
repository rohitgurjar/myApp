"use client";

import React from "react";
import AccountForm from "./account-form";

const Account: React.FC = ({ profileData, token }: any) => {
  return (
    <div>
      <AccountForm userData={profileData} token={token} />
    </div>
  );
};

export default Account;
