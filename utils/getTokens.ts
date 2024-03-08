import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Metaplex } from "@metaplex-foundation/js";
import { walletKeypair } from "./getWallet";

// this function returns all the token information and also the solana details of the owner

// what to do below
/*
first, lets get all the token that belongs to te user
secondly we will map the tokens and get the mint address of each
thirly we will then get the metaplex pda from the mint address we got;
lastly, we then get the token informations from the gotten pda
*/
export interface Itoken {
  name: string | undefined;
  symbol: string | undefined;
  image: string | undefined;
  amt: number;
  address?: string;
  price?: number;
  value?: number;
}
export const tokens = async (
  Cookievalue: string | undefined
): Promise<Itoken[]> => {
  // todo, change the pubkey with the wallet pubkey
  const walletdetails = walletKeypair(Cookievalue);
  if (!walletdetails) {
    return [];
  }

  const { pubkey } = walletdetails;
  if (!pubkey) {
    console.log("there is not pubkey in the wallet details");
    return [];
  }
  const connection = new Connection(clusterApiUrl("devnet"));
  //   first lets get the actual solana information about the address of the user
  const solDetails = await getSolsInfo(
    new PublicKey(pubkey as string),
    connection
  );
  //   getting the tokens that belong to the owner of the wallet
  // here we use the public key and the token program id
  const alltokens = await connection.getTokenAccountsByOwner(
    new PublicKey(pubkey as string),
    { programId: TOKEN_PROGRAM_ID }
  );
  if (alltokens.value.length === 0) {
    return [solDetails];
  }
  //   here, we map all the tokens to decode them and also
  // to perform there metadata check below
  const tokenList = await Promise.all(
    alltokens.value.map(async (item) => {
      const list = AccountLayout.decode(item.account.data);
      const show = connection.getTokenSupply(list.mint);
      // lets get the pda of all this mint address
      const pda = await getPda(list.mint);
      //   using a try and catch to get the tokens that actually has metadata
      // whyle using catch to get tokens that do not have a metadata
      try {
        const all = await Metadata.fromAccountAddress(connection, pda);
        const uri = await fetch(all.data.uri);
        const uriJson = await uri.json();

        const inforToreturn: Itoken = {
          name: all.data.name.split("/")[0],
          symbol: all.data.symbol.split("/")[0],
          image: uriJson.image,
          amt: Number(list.amount) / 1000000000,
          address: list.mint.toBase58(),
        };

        return inforToreturn;
      } catch (error) {
        const inforToreturn: Itoken = {
          name: undefined,
          symbol: undefined,
          image: undefined,
          amt: Number(list.amount),
          address: list.mint.toBase58(),
        };
        return inforToreturn;
      }
    })
  );
  return [solDetails, ...tokenList];
};
// getting the individual pda of the token
const getPda = async (mint: PublicKey) => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const metadata = new Metaplex(connection);
  const pda = metadata.nfts().pdas().metadata({ mint: mint });
  return pda;
};
// getting the solana details of the user here
export async function getSolsInfo(
  pubkey: PublicKey,
  connection: Connection
): Promise<Itoken> {
  const solsdeatls = await connection.getAccountInfo(pubkey);
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
  );
  const solprice = await response.json();
  const price = solprice.solana.usd;
  const amt = solsdeatls?.lamports! / LAMPORTS_PER_SOL;
  if (amt) {
    return {
      name: "Solana",
      symbol: "SOL",
      amt,
      image:
        "https://res.cloudinary.com/dffhwsp2h/image/upload/v1709612500/images/solana_jwpbpa.png",
      price,
      value: amt * price,
      address: "11111111111111111111111111111111",
    };
  } else {
    return {
      name: "Solana",
      symbol: "SOL",
      amt: 0,
      image:
        "https://res.cloudinary.com/dffhwsp2h/image/upload/v1709612500/images/solana_jwpbpa.png",
      price,
      value: 0 * price,
      address: "11111111111111111111111111111111",
    };
  }
}
