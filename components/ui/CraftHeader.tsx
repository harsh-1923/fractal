"use client";
import { Link } from "lucide-react";
import React from "react";

type CraftHeaderProps = {
  header: string;
  date: string;
};

const CraftHeader = ({ header, date }: CraftHeaderProps) => {
  return (
    <div className="flex gap-3 items-center justify-between mb-8">
      <div>
        <h1
          aria-label={`${header} - Published on ${date}`}
          className="text-[16px] font-medium leading-relaxed"
        >
          {header}
        </h1>
        <p className="text-sm text-[var(--colors-gray11)] leading-[20px]">
          {date}
        </p>
      </div>
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--colors-gray3)] shadow-[0_0_0_1px_var(--colors-grayA6)] hover:bg-[var(--colors-gray4)] focus:ring-1 focus:ring-[var(--colors-focus)]"
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        <Link size={14} className="text-[var(--colors-gray11)] rotate-45" />
      </button>
    </div>
  );
};

export default CraftHeader;
