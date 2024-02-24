"use client";
import { Keypair, PublicKey } from "@solana/web3.js";
import Cookies from "js-cookie";
import { useMemo } from "react";

// this function handles the generation of the keypair needed
// we will export the keypair and also export only the public key
export const walletKeypair = () => {
  const seedArray = useMemo(() => Cookies.get("secrete-seed"), []);

  const parsedArray = JSON.parse(seedArray!) as number[];
  const uintArray = Uint8Array.from(parsedArray);
  const newKeypair = Keypair.fromSeed(uintArray);

  const pubkey = (): string => {
    const walletPubkey = newKeypair.publicKey.toBase58();
    return walletPubkey;
  };

  return { pubkey, newKeypair };
};
