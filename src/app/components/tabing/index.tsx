"use client";

import { useState, ReactNode } from "react";

type Tab = {
  id: number;
  description: string;
};

type TabsProps = {
  tabs: Tab[];
  content: ReactNode[];
  setCurrentStep: (id: number) => void;
};

const Tabing: React.FC<TabsProps> = ({ tabs, content, setCurrentStep }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab?.id);
              setCurrentStep(tab?.id);
            }}
            className={`py-2 px-4 -mb-px border-b-2 focus:outline-none ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.description}
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
