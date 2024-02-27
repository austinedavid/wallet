import React from "react";
import { tokens } from "@/utils/getTokens";
import { Breadcrum } from "./spec-ui";
import { SharedDiv } from "../portfiolo/portfiolo-ui";
const SpecFeature = async ({ token }: { token: string }) => {
  const allToken = await tokens();
  const getOnetoken = allToken.filter((item) => item.address == token)[0];

  return (
    <div>
      <Breadcrum onetoken={getOnetoken} />
      <SharedDiv homepage={false} solInfo={getOnetoken} />
    </div>
  );
};

export default SpecFeature;
