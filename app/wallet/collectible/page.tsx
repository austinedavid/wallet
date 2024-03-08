import React from "react";
import { cookies } from "next/headers";
import CollectionFeature from "@/components/collection/collection-feature";

const page = async () => {
  const cookieStores = cookies();
  const seeds = cookieStores.get("secrete-seed")?.value;
  return (
    <div className=" w-full min-h-[calc(100vh-120px)] bg-slate-800 p-3 sm:p-6">
      <CollectionFeature cookie={seeds} />
    </div>
  );
};

export default page;
