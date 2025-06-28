import Link from "next/link";
import React from "react";

type CraftConfig = {
  title: string;
  link: string;
};

type CraftFooterProps = {
  prev?: CraftConfig;
  next?: CraftConfig;
};

const CraftFooter = ({ prev, next }: CraftFooterProps) => {
  if (!prev && !next) return null;
  return (
    <footer className="py-8 space-y-8 mt-8 text-sm">
      <hr className="border-[var(--colors-gray6)]" />
      <div className="flex items-center justify-between w-full">
        {prev ? (
          <Link href={prev.link} className="flex flex-col items-start p-2">
            <span className="text-[var(--colors-gray11)]">Prev</span>
            <span className="font-medium">{prev.title}</span>
          </Link>
        ) : (
          <div aria-hidden="true"></div>
        )}
        {next ? (
          <Link href={next.link} className="flex flex-col items-end p-2">
            <span className="text-[var(--colors-gray11)]">Next</span>
            <span className="font-medium">{next.title}</span>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </footer>
  );
};

export default CraftFooter;
