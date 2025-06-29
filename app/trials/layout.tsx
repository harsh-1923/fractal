import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <main className="w-screen h-screen">{children}</main>;
};

export default layout;
