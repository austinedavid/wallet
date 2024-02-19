import React from "react";
import { RightPart, LeftPart } from "./regui";

const Regfeatures = () => {
  return (
    <div className=" w-full md:h-screen flex flex-col md:flex-row ">
      <LeftPart />
      <RightPart />
    </div>
  );
};

export default Regfeatures;
