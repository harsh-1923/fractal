"use client";
import React from "react";
import ClipPathTabs from "./ClipPathTabs";
import DemoArea from "@/components/ui/DemoArea";

const ClipPathTabsDemo = () => {
  const [slowed, setSlowed] = React.useState<boolean>(false);
  return (
    <DemoArea preferedTheme="light" className="relative">
      <button
        data-slowed={slowed}
        className="absolute top-2 right-2 p-1.5 text-[var(--colors-gray10)] hover:text-black data-[slowed=true]:text-black rounded-full outline-none border-none focus-visible:ring-2 focus-visible:ring-[var(--colors-focus)] focus-visible:ring-offset-0 active:ring-0 active:outline-none flex items-center gap-2 text-xs "
        onClick={() => setSlowed(!slowed)}
      >
        {slowed && <p data-slowed={slowed}>Reduced Speed</p>}
        <svg
          width="16px"
          height="16px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-colors duration-150"
          color="currentColor"
        >
          <path
            d="M13.848 13.317L9.505 18.28a2 2 0 01-3.01 0l-4.343-4.963a2 2 0 010-2.634L6.495 5.72a2 2 0 013.01 0l4.343 4.963a2 2 0 010 2.634z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M13 19l4.884-5.698a2 2 0 000-2.604L13 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17 19l4.884-5.698a2 2 0 000-2.604L17 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <ClipPathTabs slowed={slowed} />
    </DemoArea>
  );
};

export default ClipPathTabsDemo;
