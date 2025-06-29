"use client";
import TextScramble from "@/components/effects/TextSramble";
import Link from "next/link";
import React from "react";

const crafts = [
  {
    title: "Hold to delete",
    href: "/craft/hold-to-delete",
    date: "June 25",
  },
  {
    title: "Glyph Inspector",
    href: "/craft/glyph-inspector",
    date: "June 28",
  },
];

const page = () => {
  return (
    <div className="">
      <h2 className="text-xl font-bold pb-5">Crafts</h2>
      <ul className="space-y-2">
        {crafts.map((craft, index) => (
          <li key={index} className="h-12 flex items-center">
            <CraftLink
              title={craft.title}
              href={craft.href}
              date={craft.date}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CraftLink = ({
  title,
  href,
  date,
}: {
  title: string;
  href: string;
  date: string;
}) => {
  return (
    <Link
      href={href}
      className="h-12 w-full flex items-center justify-between px-4"
    >
      <TextScramble
        text={title}
        scrambleSpeed={25}
        scrambledLetterCount={5}
        autoStart={true}
        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
      />
      <div className="text-sm font-mono text-[var(--colors-gray11)]">
        {date}
      </div>
    </Link>
  );
};

export default page;
