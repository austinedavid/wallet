import Sidebar from "@/components/ui/SIdebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 p-3 sm:p-6 flex flex-col md:flex-row gap-3">
      <div className=" flex1">
        <Sidebar />
      </div>
      <div className=" flex3">{children}</div>
    </div>
  );
};

export default layout;
