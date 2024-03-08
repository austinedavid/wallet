import React from "react";
import { SharedDiv, TokenDiv } from "./portfiolo-ui";
import { tokens, Itoken } from "@/utils/getTokens";
import { DataTable } from "./Table";
import { columns } from "./column";

const PortfioloFeatures = async ({
  Cookiesvalue,
}: {
  Cookiesvalue: string | undefined;
}) => {
  const lamportSize = 1e-9;
  const tokenList = await tokens(Cookiesvalue);
  const onlysol = tokenList.filter((item) => item.name == "Solana")[0];
  const fungibleTokens = tokenList.filter((item) => item.amt !== lamportSize);

  return (
    <div>
      <SharedDiv collection={false} homepage={true} solInfo={onlysol} />
      <div className=" w-full py-0 px-0 sm:py-6 sm:px-6 bg-slate-700 mt-6 rounded-md flex flex-col gap-3">
        <p className=" hidden sm:block text-white font-bold text-[23px]">
          Assets
        </p>
        <TokenDiv data={fungibleTokens} />
      </div>
    </div>
  );
};
export default PortfioloFeatures;
