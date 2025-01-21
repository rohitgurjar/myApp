"use client";

import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="bg-[#f6f9fc]">
      <div className="bg-[url('/images/home-bg.png')] bg-contain h-[700px] bg-right bg-no-repeat flex items-center">
        <div className="sm:container mx-auto">
          <div className="w-full p-8 md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-purple-800 mb-2">HI,</h2>
            <h1 className="text-5xl font-extrabold text-blue-700 mb-2">
              Lorem Ipsum
            </h1>
            <p className="text-2xl text-gray-700 mb-4">Lipsum generator</p>
            <p className="text-lg text-gray-500 mb-6 leading-relaxed">
              Lorem ipsum are many variations of passages of Lorem Ipsum
              available, but the majority have suffered alteration in some form,
              by injected humour, or randomised.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
