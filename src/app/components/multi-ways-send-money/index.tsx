import React from "react";

const MultiWaysSendMoney: React.FC = () => {
  return (
    <div className="sm:container mx-auto p-8">
      <h2 className="mb-8 text-2xl font-bold text-center">
        Multiple ways to send money
      </h2>

      {/* Grid container with responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Cash Pickup */}
        <div className="flex flex-col">
          <img
            className="mb-4"
            width="25px"
            height="30px"
            src="/images/demo.svg"
            alt="Cash Pickup"
          />
          <h6 className="mb-4 font-bold">Cash Pickup</h6>
          <p className="text-gray-400">
            Pickup cash from our local agents (Tellers) in minutes.
          </p>
        </div>

        {/* Bank Deposit */}
        <div className="flex flex-col">
          <img
            className="mb-4"
            width="25px"
            height="30px"
            src="/images/demo.svg"
            alt="Bank Deposit"
          />
          <h6 className="mb-4 font-bold">Bank Deposit</h6>
          <p className="text-gray-400">
            Pickup cash from our local agents (Tellers) in minutes.
          </p>
        </div>

        {/* Mobile Topup */}
        <div className="flex flex-col">
          <img
            className="mb-4"
            width="25px"
            height="30px"
            src="/images/demo.svg"
            alt="Mobile Topup"
          />
          <h6 className="mb-4 font-bold">Mobile Topup</h6>
          <p className="text-gray-400">
            Pickup cash from our local agents (Tellers) in minutes.
          </p>
        </div>

        {/* Mobile Money Wallet */}
        <div className="flex flex-col">
          <img
            className="mb-4"
            width="25px"
            height="30px"
            src="/images/demo.svg"
            alt="Mobile Money Wallet"
          />
          <h6 className="mb-4 font-bold">Mobile Money Wallet</h6>
          <p className="text-gray-400">
            Pickup cash from our local agents (Tellers) in minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiWaysSendMoney;
