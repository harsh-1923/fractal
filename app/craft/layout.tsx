import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">{children}</div>
  );
};

export default layout;
