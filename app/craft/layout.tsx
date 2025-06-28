import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4 pt-20 max-w-3xl mx-auto bg-[var(--background)] min-h-screen">
      {children}
    </div>
  );
};

export default layout;
