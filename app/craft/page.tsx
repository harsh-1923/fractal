"use client";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

const crafts = [
  {
    title: "Hold to delete",
    href: "/craft/hold-to-delete",
    date: "June 25",
  },
];

const page = () => {
  return (
    <div className="p-4 pt-20 max-w-3xl mx-auto bg-[var(--background)] min-h-screen">
      <motion.h2
        className="text-xl font-bold pb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Crafts
      </motion.h2>
      <motion.ul
        className="space-y-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {crafts.map((craft, index) => (
          <motion.li
            key={`${craft.title}-${index}`}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
                scale: 0.95,
                filter: "blur(4px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
                },
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            <CraftLink
              title={craft.title}
              href={craft.href}
              date={craft.date}
            />
          </motion.li>
        ))}
      </motion.ul>
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
      className="px-4 py-2 rounded-md hover:bg-[var(--colors-gray2)] bg-[var(--colors-gray1)] w-full block transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <span>{title}</span>
        <span className="text-sm font-mono text-[var(--colors-gray11)]">
          {date}
        </span>
      </div>
    </Link>
  );
};

export default page;
