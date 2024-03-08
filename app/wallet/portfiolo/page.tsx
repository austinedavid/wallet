import PortfioloFeatures from "@/components/portfiolo/portfiolo-feature";
import React from "react";
import { cookies } from "next/headers";

const page = () => {
  const cookieStore = cookies();
  const value = cookieStore.get("secrete-seed")?.value;
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 p-3 sm:p-6">
      <PortfioloFeatures Cookiesvalue={value} />
    </div>
  );
};

export default page;
