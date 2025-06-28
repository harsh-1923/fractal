import React from "react";
import { clsx as cn } from "clsx";

type DemoAreaProps = {
  children: React.ReactNode;
  className?: string;
};

const DemoArea = ({ children, className }: DemoAreaProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full min-h-80 rounded-md relative overflow-hidden bg-[var(--colors-gray1)] border border-[var(--colors-gray6)] bg-cover",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DemoArea;
