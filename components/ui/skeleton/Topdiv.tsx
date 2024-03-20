import React from "react";

// skeleton for the shared div between the portfiolo and collectible
export const TopdivSkeleton = () => {
  return (
    <div>
      <div className=" hidden  w-full h-[70px] bg-slate-700 rounded-md px-3 py-2 sm:flex items-center justify-between">
        <div className=" flex gap-2">
          <div className=" w-[200px] h-[50px] bg-slate-800 rounded-sm animate-pulse"></div>
          <div className=" w-[200px] h-[50px] bg-slate-800 rounded-sm animate-pulse"></div>
        </div>
        <div className=" flex gap-2">
          <div className=" w-[120px] h-[45px] bg-slate-800 rounded-md animate-pulse"></div>
          <div className=" w-[120px] h-[45px] bg-slate-800 rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className=" sm:hidden w-full flex flex-col justify-center items-center gap-2">
        <div className=" w-[50px] aspect-square rounded-full bg-slate-700 animate-pulse"></div>
        <div className=" w-[90px] h-[30px] bg-slate-700 animate-pulse rounded-sm" />
        <div className=" flex gap-2">
          <div className=" w-[70px] h-[35px] bg-slate-700 rounded-md animate-pulse"></div>
          <div className=" w-[70px] h-[35px] bg-slate-700 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// skeleton for the div in the main part of the portfiolo
export const PortfioloCenterSkeleton = () => {
  return (
    <div className=" w-full flex flex-col gap-4 bg-slate-700 px-2 py-5 rounded-md mt-10">
      <div className=" w-[70px] h-[50px] bg-slate-800 rounded-md" />
      <div className=" flex flex-col gap-2">
        <div className=" w-full h-[70px] rounded-sm bg-slate-800 animate-pulse" />
        <div className=" w-full h-[70px] rounded-sm bg-slate-800 animate-pulse" />
        <div className=" w-full h-[70px] rounded-sm bg-slate-800 animate-pulse" />
        <div className=" w-full h-[70px] rounded-sm bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
};

// skeleton for the div in the main part of collecible
export const CollectibleSkeleton = () => {
  return (
    <div className=" w-full bg-slate-700 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-2 rounded-md mt-4 gap-2">
      <div className=" aspect-square rounded-md bg-slate-800 animate-pulse" />
      <div className=" aspect-square rounded-md bg-slate-800 animate-pulse" />
      <div className=" aspect-square rounded-md bg-slate-800 animate-pulse" />
      <div className=" aspect-square rounded-md bg-slate-800 animate-pulse" />
    </div>
  );
};
