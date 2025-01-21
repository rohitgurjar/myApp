import React from "react";

const DownloadApp: React.FC = () => {
  return (
    <div className="bg-[#F4F6F8]">
      <div className="sm:container mx-auto p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left">
            <h2 className="mb-8 text-2xl font-bold">
              Download App mobile for quicker transactions
            </h2>
            <div className="flex justify-center items-center">
              <div className="mr-4">
                <img
                  className="mb-4"
                  src="/images/AppStore.svg"
                  alt="App Store"
                />
              </div>

              <div>
                <img
                  className="mb-4"
                  src="/images/PlayStore.svg"
                  alt="Play Store"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-0 order-1">
            <img
              className="mb-4 w-64 sm:w-auto"
              src="/images/iphone.png"
              alt="iPhone"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
