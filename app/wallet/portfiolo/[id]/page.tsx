import React from "react";
import SpecFeature from "@/components/spec/spec-feature";
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 p-3 sm:p-6">
      <SpecFeature token={params.id} />
    </div>
  );
};

export default page;
