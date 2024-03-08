"use client";
import React, { useEffect, useState } from "react";
import { getSolsInfo, Itoken } from "@/utils/getTokens";
import { Connection, PublicKey, clusterApiUrl, Keypair } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { walletKeypair } from "@/utils/getWallet";
import Cookies from "js-cookie";

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
  const { pubkey } = useWallet();
  const copyaddress = () => {
    window.navigator.clipboard.writeText(pubkey as string);
    toast.success("address copied");
  };
  return { copyaddress };
};

// here we use this function to retrieve our cookies and get the item stored
// then use this to get the seed and manipute it to get the public and keypair
export const useWallet = () => {
  const [newKeypair, setkeypair] = useState<Keypair>();
  const [pubkey, setpubkey] = useState<string>();
  useEffect(() => {
    const cookies = Cookies.get("secrete-seed") as string;
    const numberArray = cookies.split(",").map(Number);

    const uintArray = Uint8Array.from(numberArray);
    const newKeypair = Keypair.fromSecretKey(uintArray);
    setkeypair(newKeypair);
    const pubkey = newKeypair.publicKey.toBase58();
    setpubkey(pubkey);
  }, []);

  return { newKeypair, pubkey };
};
