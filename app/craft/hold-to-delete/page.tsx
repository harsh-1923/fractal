"use client";
import CraftHeader from "@/components/ui/CraftHeader";
import React from "react";
import "./hold-to-delete.css";

const page = () => {
  return (
    <div className="p-5 pt-20 max-w-3xl mx-auto">
      <CraftHeader header="Hold to delete" date="June 25" />
      <div className="flex items-center justify-center w-full h-80 rounded-md relative overflow-hidden">
        <button className="button bg-[var(--colors-gray2)] text-white text-lg px-4 py-4 gap-3 user-select-none touch-manipulation rounded-full active:scale-[0.97]">
          <div className="hold-overlay absolute inset-0 flex items-center justify-center gap-3 bg-[var(--colors-gray8)] text-black rounded-full">
            <div className="size-6 rounded-full bg-[var(--colors-gray11)] flex items-center justify-center gap-3">
              <div className="size-[11px] rounded-[1px] bg-white"></div>
            </div>
            <span className="user-select-none">Tap and hold to stop</span>
          </div>
          <div className="size-6 rounded-full bg-white flex items-center justify-center gap-3">
            <div className="size-[11px] rounded-[1px] bg-[var(--colors-gray11)]"></div>
          </div>
          <span className="user-select-none">Tap and hold to stop</span>
        </button>
      </div>
    </div>
  );
};

export default page;
