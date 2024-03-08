import React from "react";
import { tokens } from "@/utils/getTokens";
import { Breadcrum } from "./spec-ui";
import { SharedDiv } from "../portfiolo/portfiolo-ui";
import { cookies } from "next/headers";
const SpecFeature = async ({ token }: { token: string }) => {
  const cookieStore = cookies();
  const cookiedata = cookieStore.get("secrete-seed")?.value;
  const allToken = await tokens(cookiedata);
  const getOnetoken = allToken.filter((item) => item.address == token)[0];

  return (
    <div>
      <Breadcrum value={"portfiolo"} onetoken={getOnetoken} />
      <SharedDiv collection={false} homepage={false} solInfo={getOnetoken} />
    </div>
  );
};

export default SpecFeature;
