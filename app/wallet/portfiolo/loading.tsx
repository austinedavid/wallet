import React from "react";
import {
  PortfioloCenterSkeleton,
  TopdivSkeleton,
} from "@/components/ui/skeleton/Topdiv";

const Loading = () => {
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 p-3 sm:p-6">
      <TopdivSkeleton />
      <PortfioloCenterSkeleton />
    </div>
  );
};

export default Loading;
