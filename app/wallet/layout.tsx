import Nav from "@/components/ui/Nav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full">
      <Nav />
      {children}
    </div>
  );
};

export default layout;
