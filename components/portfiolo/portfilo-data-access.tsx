"use client";
import React from "react";
import { getSolsInfo, Itoken } from "@/utils/getTokens";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// exporting solana custome hook details which will be used in the portfiolo page
export const useSolInfo = () => {
  const address = "Gu6YtszBvwy5jng1GeMmmH2CkmnNAhVax4fXDvn17fV1";
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const publickey = new PublicKey(address);
  const getSolDetails = useQuery({
    queryKey: ["getSolsinfo"],
    queryFn: async () => {
      const value = await getSolsInfo(publickey, connection);
      console.log(value);
      return value;
    },
  });
  return { getSolDetails };
};

export const userSubstring = (address: string) => {
  // generating a subtext for coins without  names and symbols
  const firstPath = address?.substring(0, 3);
  const lastPath = address?.substring(address.length - 3, address.length);
  const joinedPath = `${firstPath}...${lastPath}`;
  return { joinedPath };
};

export const useCopy = () => {
  const copyaddress = (address: string) => {
    window.navigator.clipboard.writeText(address);
    toast.success("address copied");
  };
  return { copyaddress };
};
