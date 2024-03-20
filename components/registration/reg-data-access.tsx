"use client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import * as mnemonic from "bip39";
import Cookies from "js-cookie";
import { Keypair } from "@solana/web3.js";
import bcryptjs from "bcryptjs";

// created custome hook to handle everything about wallet setup
// authentication and routing to portfiolo if there is password
export const useMnemonic = () => {
  const route = useRouter();
  const [nstring, setnstring] = useState("");
  const [nstring1, setnstring1] = useState("");
  const staticd = "dav";
  const getseed = useQuery({
    queryKey: ["nothing"],
    queryFn: async () => {
      const phrase = await fetch("/api");
      const body = await phrase.json();
      setnstring(body);
      return body.message;
    },
  });
  const mnemoicArray = useMemo(
    () => mnemonic.generateMnemonic().split(" "),
    [staticd]
  );
  // to copy the seed phrase
  const handleCopy = (Strings: string) => {
    navigator.clipboard.writeText(Strings);
    toast.success("Phrase copied successfully!!");
  };
  // to set item to the local storage
  const setLocalStorage = (phrase: string) => {
    // lets convert the seed phrase to secrete seed
    const seed = mnemonic.mnemonicToSeedSync(phrase);
    // lets split the 64base string to base 32 which is used in solana
    const base32Seed = Keypair.fromSeed(seed.slice(0, 32));
    // here, we formed an array which we will then store to the cookie
    const seedArray = `${base32Seed.secretKey.toString()}`;
    Cookies.set("secrete-seed", seedArray, { expires: 10 * 365 });
  };
  const savePassword = (item: string) => {
    const { setSettings } = useSettings();
    // lets generate a hash for this password
    const hashedpassword = bcryptjs.hashSync(item, 10);
    Cookies.set("wallet-password", hashedpassword);
    setSettings("currency", "United States Dollar (USD)");
    setSettings("language", "English");
    setSettings("network", "Devnet");
    route.push("/wallet/portfiolo");
  };
  // this function downloads the seed phrase when clicked with the name
  // seed-phrase.txt
  const handleDownload = (phrase: string) => {
    const blob = new Blob([phrase], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seed-phrase.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("seed phrase downloaded");
  };
  return {
    handleCopy,
    setLocalStorage,
    savePassword,
    handleDownload,
    getseed,
    mnemoicArray,
  };
};

// this part control the user check for password
export const useVerify = () => {
  const route = useRouter();
  const user = Cookies.get("wallet-password");
  const phrase = Cookies.get("secrete-seed");
  if (user) {
    return route.push("/wallet/portfiolo");
  }
};

// this function handles other things like setting the network, the currency and the language we need
export const useSettings = () => {
  // we will use the function below to set the items in the local storage
  const setSettings = (item: string, value: string) => {
    if (item == "currency") {
      Cookies.set("currency", value, { expires: 10 * 365 });
    } else if (item == "language") {
      Cookies.set("language", value, { expires: 10 * 365 });
    } else {
      Cookies.set("network", value, { expires: 10 * 365 });
    }
  };
  // here we use this function to get the setting we seek
  const getSettings = (item: string) => {
    if (item == "currency") {
      return Cookies.get("currency");
    } else if (item == "language") {
      return Cookies.get("language");
    } else {
      return Cookies.get("network");
    }
  };
  return { setSettings, getSettings };
};
