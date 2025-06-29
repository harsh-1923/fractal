import React from "react";
import { clsx as cn } from "clsx";

type DemoAreaProps = {
  children: React.ReactNode;
  className?: string;
  preferedTheme?: "light" | "dark" | "system";
};

const DemoArea = ({
  children,
  className,
  preferedTheme = "system",
}: DemoAreaProps) => {
  return (
    <div
      data-demo-area
      className={cn(
        "flex items-center justify-center w-full min-h-80 rounded-md relative overflow-hidden border border-[var(--colors-gray6)] bg-cover",
        preferedTheme === "light"
          ? "dark:bg-[var(--colors-gray12)] bg-[var(--colors-gray1)]"
          : preferedTheme === "dark"
          ? "bg-[var(--colors-gray12)] dark:bg-[var(--colors-gray1)]"
          : "bg-[var(--colors-gray1)]",
        className
      )}
    >
      {children}
    </div>
  );
};  

export default DemoArea;
