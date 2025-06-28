"use client";
import { Check, Link } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

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
          className="text-[16px] font-medium leading-relaxed font-semibold"
        >
          {header}
        </h1>
        <p className="text-sm text-[var(--colors-gray11)] leading-[20px]">
          {date}
        </p>
      </div>
      <CraftLinkButton />
    </div>
  );
};

const CraftLinkButton = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button
      className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--colors-gray1)] hover:bg-[var(--colors-gray2)] dark:bg-[var(--colors-gray3)] outline-none border-none focus-visible:ring-2 focus-visible:ring-[var(--colors-focus)] focus-visible:ring-offset-0 active:ring-0 active:outline-none"
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            transition={{ duration: 0.1 }}
          >
            <Check
              size={14}
              className="text-[var(--colors-teal11)]"
              strokeWidth={3}
            />
          </motion.div>
        ) : (
          <motion.div
            key="link"
            initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            transition={{ duration: 0.1 }}
          >
            <Link size={14} className="text-[var(--colors-gray11)] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CraftHeader;
