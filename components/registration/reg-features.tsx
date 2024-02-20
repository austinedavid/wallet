"use client";
import React from "react";
import { RightPart, LeftPart } from "./regui";
import { useRouter } from "next/navigation";

const Regfeatures = () => {
  const route = useRouter();
  // check for local storage if user exist
  const user = localStorage.getItem("wallet-password");
  if (user) {
    return route.push("/wallet/portfiolo");
  }
  return (
    <div className=" w-full md:h-screen flex flex-col md:flex-row ">
      <LeftPart />
      <RightPart />
    </div>
  );
};

export default Regfeatures;
