import React from "react";
import { SharedDiv, TokenDiv } from "./portfiolo-ui";
import { tokens, Itoken } from "@/utils/getTokens";
import { DataTable } from "./Table";
import { columns } from "./column";

const PortfioloFeatures = async () => {
  const tokenList = await tokens();
  const normalTokens = tokenList.filter((item) => item.amt > 1);
  return (
    <div>
      <SharedDiv />
      <div className=" w-full py-0 px-0 sm:py-6 sm:px-6 bg-slate-700 mt-6 rounded-md flex flex-col gap-3">
        <p className=" hidden sm:block text-white font-bold text-[23px]">
          Assets
        </p>
        <TokenDiv data={normalTokens} />
      </div>
    </div>
  );
};
export default PortfioloFeatures;
