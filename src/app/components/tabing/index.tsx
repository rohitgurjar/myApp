"use client";

import { useState, ReactNode } from "react";

type TabsProps = {
  tabs: string[];
  content: ReactNode[]; // Accept an array of React elements or nodes
};

const Tabing: React.FC<TabsProps> = ({ tabs, content }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 -mb-px border-b-2 focus:outline-none ${
              activeTab === index
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {content[activeTab]} {/* Render ReactNode content */}
      </div>
    </div>
  );
};

export default Tabing;
