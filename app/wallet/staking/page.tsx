import StakingFeature from "@/components/staking/staking-feature";
import React from "react";

const page = () => {
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 flex items-center justify-center md:items-start lg:items-center md:pt-20 lg:mt-0">
      <StakingFeature />
    </div>
  );
};

export default page;
