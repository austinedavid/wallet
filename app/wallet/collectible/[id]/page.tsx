import NftFeatures from "@/components/singleNft/nft-features";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 p-3 sm:p-6">
      <NftFeatures id={params.id} />
    </div>
  );
};

export default page;
