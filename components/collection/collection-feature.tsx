import React from "react";
import { SharedDiv } from "../portfiolo/portfiolo-ui";
import { tokens } from "@/utils/getTokens";
import { AllNftDiv, NoNft } from "./collection-ui";

const CollectionFeature = async ({
  cookie,
}: {
  cookie: string | undefined;
}) => {
  const lamportSize = 1e-9;
  const tokenList = await tokens(cookie);
  const onlysol = tokenList.filter((item) => item.name == "Solana")[0];
  const nfts = tokenList.filter((item) => item.amt == lamportSize);
  return (
    <div>
      {nfts.length > 0 ? (
        <SharedDiv collection={true} homepage={false} solInfo={onlysol} />
      ) : (
        <div className=" text-white  font-bold">
          <p className=" text-lg">NFTs</p>
        </div>
      )}
      {nfts.length > 0 ? (
        <AllNftDiv nfts={nfts} />
      ) : (
        <NoNft solInfo={onlysol} />
      )}
    </div>
  );
};
export default CollectionFeature;
