"use client";
import CraftHeader from "@/components/ui/CraftHeader";
import React from "react";
import "./hold-to-delete.css";
import Image from "next/image";

const HoldToDelete = () => {
  return (
    <div className="p-4 pt-20 max-w-3xl mx-auto bg-[var(--background)] min-h-screen">
      <CraftHeader header="Hold to delete" date="June 25" />
      <div
        className="flex items-center justify-center w-full h-80 rounded-md relative overflow-hidden bg-[var(--colors-gray1)] border border-[var(--colors-gray6)] bg-cover"
        style={{
          backgroundImage: "url(/img/hold.png)",
        }}
      >
        <button className="hold-to-delete-button text-[var(--colors-gray12)] text-lg px-4 py-4 gap-3 select-none touch-manipulation rounded-4xl active:scale-[0.99] bg-black/55 backdrop-blur-[4px] outline-none border-none focus-visible:ring-2 focus-visible:ring-[var(--colors-focus)] focus-visible:ring-offset-1 shadow-2xl">
          <div
            className="hold-overlay absolute inset-0 flex items-center justify-center gap-3 bg-[#fcfcfc] text-[var(--colors-gray1)] rounded-4xl"
            style={
              {
                "--hold-to-delete-transition-duration": "0.2s",
              } as React.CSSProperties
            }
          >
            <div className="size-6 rounded-full bg-[var(--colors-gray11)] flex items-center justify-center gap-3">
              <div className="size-[11px] rounded-[1px] bg-[var(--colors-gray1)]"></div>
            </div>
            <span className="select-none">Tap and hold to stop</span>
          </div>
          <div className="size-6 rounded-full bg-[var(--colors-gray1)] flex items-center justify-center gap-3">
            <div className="size-[11px] rounded-[1px] bg-[var(--colors-gray11)]"></div>
          </div>
          <span className="select-none text-[var(--colors-gray1)] dark:text-[var(--colors-gray12)]">
            Tap and hold to stop
          </span>
        </button>
      </div>
    </div>
  );
};

export default HoldToDelete;
