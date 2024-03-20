import React from "react";
import {
  CollectibleSkeleton,
  PortfioloCenterSkeleton,
  TopdivSkeleton,
} from "@/components/ui/skeleton/Topdiv";

const Loading = () => {
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 p-3 sm:p-6">
      <TopdivSkeleton />
      <CollectibleSkeleton />
    </div>
  );
};

export default Loading;
