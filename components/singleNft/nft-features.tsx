import React from "react";
import { cookies } from "next/headers";
import { tokens } from "@/utils/getTokens";
import { Breadcrum } from "../spec/spec-ui";
import { NftDetails, Topdiv } from "./nft-ui";

const NftFeatures = async ({ id }: { id: string }) => {
  // here we get the cookies
  const cookieStore = cookies();
  const seed = cookieStore.get("secrete-seed")?.value;
  // here we get all the token
  // then access those that are only nft
  // then we filter only one nft based on it address
  const lamportSize = 1e-9;
  const allTokens = await tokens(seed);
  const allNft = allTokens.filter((item) => item.amt === lamportSize);
  const spectNft = allNft.filter((item) => item.address === id)[0];
  return (
    <div>
      <Breadcrum value={"collectible"} onetoken={spectNft} />
      <Topdiv nft={spectNft} />
      <NftDetails nft={spectNft} />
    </div>
  );
};

export default NftFeatures;
