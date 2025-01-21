"use client";

import React from "react";
import ResendActivationEmailDialog from "../components/resend-activation-email-dialog";

const ResendActivationEmail: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="container mx-auto py-5 px-4">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto text-center sm:w-full sm:max-w-sm">
          <div className="flex justify-center mb-12">
            <svg
              fill="#DBA800"
              viewBox="0 0 493.636 493.636"
              width="70px"
              height="70px"
            >
              <path d="M421.428 72.476C374.868 25.84 312.86.104 246.724.044 110.792.044.112 110.624 0 246.548c-.068 65.912 25.544 127.944 72.1 174.584 46.564 46.644 108.492 72.46 174.4 72.46h.58v-.048c134.956 0 246.428-110.608 246.556-246.532C493.7 181.12 468 119.124 421.428 72.476zM257.516 377.292c-2.852 2.856-6.844 4.5-10.904 4.5-4.052 0-8.044-1.66-10.932-4.516-2.856-2.864-4.496-6.852-4.492-10.916.004-4.072 1.876-8.044 4.732-10.884 2.884-2.86 7.218-4.511 11.047-4.542 3.992.038 7.811 1.689 10.677 4.562 2.872 2.848 4.46 6.816 4.456 10.884-.004 4.08-1.696 8.052-4.584 10.912zm4.596-72.6c-.008 8.508-6.928 15.404-15.448 15.404-8.5-.008-15.42-6.916-15.416-15.432l.28-169.664c.004-8.484 3.975-15.387 15.488-15.414 4.093.021 7.895 1.613 10.78 4.522 2.912 2.916 4.476 6.788 4.472 10.912l-.156 169.672z"></path>
            </svg>
          </div>
          <h1 className="text-[30px] mb-6">
            Please activate your account by clicking on activation link sent to
            your email!!
          </h1>

          <p className="mb-4">
            If activation link not received, Click below button to get
            activation link on your email.
          </p>

          <div>
            <button
              type="button"
              onClick={openDialog}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              Send activation link
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <ResendActivationEmailDialog closeDialog={closeDialog} />
      )}
    </div>
  );
};

export default ResendActivationEmail;
