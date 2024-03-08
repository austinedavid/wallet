import { Keypair, PublicKey } from "@solana/web3.js";

export const walletKeypair = (cookieValue: string | undefined) => {
  if (!cookieValue) {
    console.error("Cookie 'secrete-seed' not found");
    return null;
  }

  const numberArray = cookieValue.split(",").map(Number);
  if (numberArray.some(isNaN)) {
    console.error("Invalid cookie value");
    return null;
  }

  const uintArray = Uint8Array.from(numberArray);
  const newKeypair = Keypair.fromSecretKey(uintArray);

  const pubkey = newKeypair.publicKey.toBase58();

  return { newKeypair, pubkey };
};

// const seedArray = localStorage.getItem("secrete-seed") as string;
//   console.log(seedArray);
//   const parsedArray = JSON.parse(seedArray as string) as number[];
//   const uintArray = Uint8Array.from(parsedArray);
//   const newKeypair = Keypair.fromSeed(uintArray);

//   const pubkey = (): string => {
//     const walletPubkey = newKeypair.publicKey.toBase58();
//     return walletPubkey;
//   };

//   return { pubkey, newKeypair };
