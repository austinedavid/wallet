"use client";
import React from "react";
import { RightPart, LeftPart } from "./regui";
import { useVerify } from "./reg-data-access";

const Regfeatures = () => {
  const check = useVerify();

  return (
    <div className=" w-full md:h-screen flex flex-col md:flex-row ">
      <LeftPart />
      <RightPart />
    </div>
  );
};

export default Regfeatures;
