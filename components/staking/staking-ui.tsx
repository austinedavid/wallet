import Image from "next/image";
import React from "react";

export const StakingDiv = () => {
  return (
    <div className=" flex flex-col gap-4 items-center justify-center">
      <Image
        className=" grayscale opacity-50 w-[300px] h-[300px] rounded-md"
        src="/invest.avif"
        alt="invest"
        width={200}
        height={200}
      />
      <p className=" text-slate-300 font-bold">
        Stake sol and earn staking reward
      </p>
      <div className=" w-fit px-6 py-3 bg-[tomato] rounded-md text-white cursor-pointer">
        <p>Stake now</p>
      </div>
    </div>
  );
};
