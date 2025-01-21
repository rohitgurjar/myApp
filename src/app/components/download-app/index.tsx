import React from "react";
import Image from "next/image";

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
                <Image
                  width={120}
                  height={20}
                  src="/images/AppStore.svg"
                  alt="App Store"
                  className="mb-4"
                />
              </div>

              <div>
                <Image
                  width={120}
                  height={20}
                  src="/images/PlayStore.svg"
                  alt="Play Store"
                  className="mb-4"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-0 order-1">
            <Image
              width={672}
              height={745}
              src="/images/iphone.png"
              alt="iPhone"
              className="mb-4 w-64 sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
