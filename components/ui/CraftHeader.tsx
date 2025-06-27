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
        <p className="text-sm text-gray-400 leading-[20px]">{date}</p>
      </div>
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800"
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        <Link className="w-4 h-4 text-gray-300 rotate-45" />
      </button>
    </div>
  );
};

export default CraftHeader;
