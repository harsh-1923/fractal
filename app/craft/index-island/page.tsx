"use client";
import CraftHeader from "@/components/ui/CraftHeader";
import React, { useState } from "react";

const page = () => {
  return (
    <div className="p-4 pt-20 max-w-3xl mx-auto bg-[var(--background)] min-h-screen">
      <CraftHeader header="Hold to delete" date="June 25" />
      <div
        className="flex items-center justify-center w-full h-80 rounded-md relative overflow-hidden bg-[var(--colors-gray1)] border border-[var(--colors-gray6)] bg-cover p-5"
        style={{
          backgroundImage: "url(/img/hold.png)",
        }}
      >
        <Island />
      </div>
    </div>
  );
};

const INDEX_ITEMS = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
];

const Island = () => {
  const [dir, setDir] = useState<"up" | "down">("up");
  return (
    <div className="bg-[var(--colors-gray1)] w-full mx-3">
      <div className="flex items-center justify-center w-full h-full overflow-x-scroll scrollbar-hide">
        <ul className="flex items-center justify-center h-full gap-5 w-fit">
          {INDEX_ITEMS.map((item, index) => (
            <li key={index} className="text-center whitespace-nowrap py-2 px-4">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
