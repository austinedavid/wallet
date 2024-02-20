"use client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import * as mnemonic from "bip39";
import Cookies from "js-cookie";

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
    localStorage.setItem("seed-phrase", phrase);
  };
  const savePassword = (item: string) => {
    Cookies.set("wallet-password", item);
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
  if (user) {
    return route.push("/wallet/portfiolo");
  }
};
