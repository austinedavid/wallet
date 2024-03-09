"use client";
import React, { useRef, useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Itoken } from "@/utils/getTokens";
import Image from "next/image";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/utils/getsize";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { userSubstring, useCopy, useWallet } from "./portfilo-data-access";
import { useRouter } from "next/navigation";
import { createQR } from "@solana/pay";
import { Toaster } from "react-hot-toast";
import { RightForCollection } from "@/components/collection/collection-ui";
import { NftSendBtnDiv } from "../singleNft/nft-ui";
import { useDownload } from "../singleNft/nft-data-access";
// the first div in the portfiolo component and also in the collection
export const SharedDiv = ({
  solInfo,
  homepage,
  collection,
}: {
  solInfo: Itoken;
  homepage: boolean;
  collection: boolean;
}) => {
  return (
    <>
      <div className=" w-full md:h-[70px] sm:bg-slate-700 rounded-md px-4 py-2 flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-center sm:justify-between gap-2 sm:gap-0 ">
        <div className=" flex flex-col md:flex-row items-center gap-4 md:gap-8 h-full">
          <DivwithPrice
            collection={collection}
            homepage={homepage}
            solInfo={solInfo}
          />
          {!collection && (
            <>
              <div className="hidden md:block w-[1px] h-full bg-white"></div>
              <DivWithAddress homepage={homepage} solInfo={solInfo} />
            </>
          )}
        </div>
        <div>
          {collection ? (
            <RightForCollection solInfo={solInfo} />
          ) : (
            <RightFirst solInfo={solInfo} />
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};
// the div showing the sol price
export const DivwithPrice = ({
  homepage,
  solInfo,
  collection,
}: {
  homepage: boolean;
  solInfo: Itoken;
  collection: boolean;
}) => {
  return (
    <>
      {homepage || collection ? (
        <div className=" flex flex-col sm:flex-row items-center gap-3">
          <div className=" w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-red-400"></div>
          <div className=" flex flex-col items-center sm:items-start">
            {collection ? (
              <p className=" text-gray-200 text-[12px]">Total floor value</p>
            ) : (
              <p className=" text-gray-200 text-[12px]">
                Total portfolio value
              </p>
            )}
            {collection ? (
              <p className=" text-[20px] text-white">$0.00</p>
            ) : (
              <p className=" text-[20px] text-white">${solInfo.value}</p>
            )}
          </div>
        </div>
      ) : (
        <TokenNames column={true} data={solInfo} />
      )}
    </>
  );
};
// the div showing the address and copy
export const DivWithAddress = ({
  homepage,
  solInfo,
}: {
  homepage: boolean;
  solInfo: Itoken;
}) => {
  const { copyaddress } = useCopy();
  const [showcopied, setshowcopied] = useState<boolean>(false);
  const handleCopy = () => {
    copyaddress();
    // here we set copied to true and toggle it back to false after 5 seconds
    setshowcopied(true);
    setTimeout(() => {
      setshowcopied(false);
    }, 1000);
  };
  return (
    <>
      {homepage ? (
        <div className=" sm:flex space-x-2 hidden relative ">
          <AddressSubstring />
          <div
            onClick={handleCopy}
            className=" cursor-pointer w-[30px] h-[30px] flex items-center justify-center text-white rounded-full transition transform ease-in-out duration-500 hover:bg-slate-500"
          >
            <ContentCopyIcon style={{ fontSize: 18 }} />
          </div>
          <div className=" cursor-pointer w-[30px] h-[30px] flex items-center justify-center text-white rounded-full transition transform ease-in-out duration-500 hover:bg-slate-500">
            <QrCodeIcon style={{ fontSize: 18 }} />
          </div>

          <div
            className={` transform translate duration-700  transition-opacity ${
              showcopied ? "opacity-100" : "opacity-0"
            }  ease-in-out bg-slate-500  px-4 py-2 rounded-sm absolute bottom-[-43px] left-[50px] `}
          >
            <p className="text-white  text-sm">copied</p>
          </div>
        </div>
      ) : (
        <div className=" sm:flex flex-col hidden  ">
          <p className=" text-gray-400 ">Amount</p>
          <div className=" flex space-x-1 text-white">
            <p>{solInfo.amt}</p>
            {solInfo.name && <p>{solInfo.name.replace(/\0.*$/g, "")}</p>}
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

// the div below we generated the subString for the application
export const AddressSubstring = () => {
  const { pubkey } = useWallet();
  const walletAddress = userSubstring(pubkey as string);
  return (
    <div>
      <p className=" text-white font-bold">{walletAddress.joinedPath}</p>
    </div>
  );
};

// the right part of the first div right part
export const RightFirst = ({ solInfo }: { solInfo: Itoken }) => {
  return (
    <div className=" flex gap-3 items-center">
      <SendBtn
        portfiolo={true}
        value={"Receive"}
        solInfo={solInfo}
        small={false}
        isNft={false}
      />
      <SendBtn
        portfiolo={true}
        value={"Send"}
        solInfo={solInfo}
        small={false}
        isNft={false}
      />
    </div>
  );
};

// creating the receive button below
export const TransactionBtn = ({
  value,
  small,
}: {
  value: string;
  small: boolean;
}) => {
  return (
    <div>
      <div
        className={` ${
          small
            ? " bg-[tomato] px-4 py-2 text-black text-[12px] font-bold hover:bg-[coral]"
            : "bg-slate-900 px-4 py-2 sm:px-6 sm:py-3 text-white hover:bg-slate-700  sm:hover:bg-slate-800"
        }  rounded-md cursor-pointer transition-all transform ease-in-out duration-500 `}
      >
        <p className="">{value}</p>
      </div>
    </div>
  );
};

// below is the div that controls the token part
export const TokenDiv = ({ data }: { data: Itoken[] }) => {
  return (
    <div>
      <div className="w-full hidden md:grid grid-cols-5 text-gray-400 px-2  mb-2 mt-2">
        <p>Name</p>
        <p>Price/24hrs change</p>
        <p>Value</p>
        <p>Amount</p>
        <div></div>
      </div>
      {data.map((item, index) => (
        <EachToken key={index} data={item} />
      ))}
    </div>
  );
};

export const EachToken = ({ data }: { data: Itoken }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const amtRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const route = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      e.target === divRef.current ||
      e.target === priceRef.current ||
      e.target === amtRef.current ||
      e.target === dataRef.current
    ) {
      return route.push(
        `/wallet/portfiolo/${
          data.address == undefined
            ? "11111111111111111111111111111111"
            : data.address
        }`
      );
    }
  };
  return (
    // items here should be in grid
    <div
      ref={divRef}
      onClick={handleClick}
      className=" flex items-center justify-between group md:grid md:grid-cols-5 py-4 px-2 border-b md:border-y border-gray-500 w-full md:hover:border-slate-800 md:hover:bg-slate-800 transform ease-in-out duration-500 cursor-pointer"
    >
      <TokenNames column={false} data={data} />
      <div
        onClick={handleClick}
        ref={priceRef}
        className="text-white hidden md:flex items-center"
      >
        <p>{data.price}</p>
      </div>
      <div
        onClick={handleClick}
        ref={dataRef}
        className=" text-white hidden md:flex items-center"
      >
        {data.price && <p>{(data?.price! * data.amt).toFixed(2)}</p>}
      </div>
      <div
        onClick={handleClick}
        ref={amtRef}
        className="text-white flex items-center"
      >
        <p>{data.amt}</p>
      </div>
      <div className=" hidden items-center md:flex justify-end">
        <div className=" self-end flex items-center space-x-2 text-white">
          <div className=" hidden group-hover:block ease-in-out duration-300 transform">
            <SendBtn
              portfiolo={true}
              value={"Send"}
              solInfo={data}
              small={true}
              isNft={false}
            />
          </div>
          <div className=" w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700 transform ease-in-out duration-300">
            <DropdownDiv data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

// here we get the token names and symbols
export const TokenNames = ({
  data,
  column,
}: {
  data: Itoken;
  column: boolean;
}) => {
  const { joinedPath } = userSubstring(data.address as string);
  return (
    <div
      className={` flex ${
        column ? " flex-col sm:flex-row" : "flex-row"
      } gap-2 items-center`}
    >
      {data.image ? (
        <div className=" w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center">
          <Image src={data.image!} alt="" width={30} height={30} />
        </div>
      ) : (
        <NoImageDiv big={true} />
      )}
      {data.name ? (
        <div
          className={`${
            column && " flex flex-col items-center sm:items-start"
          }`}
        >
          <p className=" text-white">{data.name.replace(/\0.*$/g, "")}</p>
          <p className=" text-gray-400 text-[12px]">
            {data.symbol?.replace(/\0.*$/g, "")}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-white">{joinedPath}</p>
        </div>
      )}
    </div>
  );
};

export const NoImageDiv = ({ big }: { big: boolean }) => {
  return (
    <div
      className={` text-white ${
        big ? "w-[40px] h-[40px]" : "w-[30px] h-[30px]"
      }  rounded-full bg-black relative flex items-center justify-center`}
    >
      <QuestionMarkOutlinedIcon style={{ fontSize: 16 }} />
      <div
        className={` text-black absolute bottom-0 left-6 bg-yellow-500 ${
          big ? "w-[20px] h-[20px]" : "w-[13px] h-[13px]"
        }  rounded-full flex items-center justify-center`}
      >
        <PriorityHighOutlinedIcon style={{ fontSize: 10 }} />
      </div>
    </div>
  );
};

export const DropdownDiv = ({ data }: { data: Itoken }) => {
  const { goToExplorer } = useDownload();
  const handleExplorer = () => {
    goToExplorer(data.address as string);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertOutlinedIcon style={{ fontSize: 23 }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-slate-900 text-white">
        {data.name === "Solana" && (
          <>
            <DropdownMenuItem className=" hover:bg-transparent">
              Request Airdrop
            </DropdownMenuItem>
            <DropdownMenuItem>Stake</DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem className=" cursor-pointer" onClick={handleExplorer}>
          View on explorer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// here we create the drawer button
export function SendBtn({
  small,
  solInfo,
  value,
  portfiolo,
  isNft,
}: {
  small: boolean;
  solInfo: Itoken;
  value: string;
  portfiolo: boolean;
  isNft: boolean;
}) {
  const { isDesktop } = useMediaQuery();
  const [open, setOpen] = React.useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className={` ${
              small
                ? " bg-[tomato] px-4 py-2 text-black text-[12px] font-bold hover:bg-[coral]"
                : "bg-slate-900 px-4 py-2 sm:px-6 sm:py-3 text-white hover:bg-slate-700  sm:hover:bg-slate-800"
            }  rounded-md cursor-pointer transition-all transform ease-in-out duration-500 border-0 `}
          >
            {value}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-900">
          <DialogHeader>
            {value == "Send" && (
              <DialogTitle className="text-white">Send</DialogTitle>
            )}
          </DialogHeader>
          {value == "Send" ? (
            <div>
              {isNft ? (
                <NftSendBtnDiv solInfo={solInfo} />
              ) : (
                <SendForm solInfo={solInfo} />
              )}
            </div>
          ) : (
            <ReceiveForm portfiolo={portfiolo} solInfo={solInfo} />
          )}
        </DialogContent>
        <Toaster />
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div
          className={` ${
            small
              ? " bg-[tomato] px-4 py-2 text-black text-[12px] font-bold hover:bg-[coral]"
              : "bg-slate-900 px-4 py-2 sm:px-6 sm:py-3 text-white hover:bg-slate-700  sm:hover:bg-slate-800"
          }  rounded-md cursor-pointer transition-all transform ease-in-out duration-500 border-0 `}
        >
          {value}
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-4 bg-slate-900">
        <DrawerHeader className="text-left">
          {value == "Send" && (
            <DrawerTitle className=" text-white font-bold">Send</DrawerTitle>
          )}
        </DrawerHeader>
        {value == "Send" ? (
          <div>
            {isNft ? (
              <NftSendBtnDiv solInfo={solInfo} />
            ) : (
              <SendForm solInfo={solInfo} />
            )}
          </div>
        ) : (
          <ReceiveForm portfiolo={portfiolo} solInfo={solInfo} />
        )}
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
      <Toaster />
    </Drawer>
  );
}

function SendForm({ solInfo }: { solInfo: Itoken }) {
  const { joinedPath } = userSubstring(solInfo.address as string);
  return (
    <div className=" flex flex-col space-y-3 mt-6">
      {/* div for the first part and also the text and the input */}
      <div>
        <div className=" w-full flex items-center justify-between mb-[5px]">
          <p className=" text-gray-400 text-[12px]">Token</p>
          <p className=" text-white text-[12px]">
            Max:{solInfo.amt.toFixed(5)}
          </p>
        </div>
        <div className=" w-full flex items-center py-3 px-2 bg-slate-800 rounded-sm space-x-1">
          <div className=" flex  w-[130px] space-x-2 items-center">
            {solInfo.image ? (
              <Image
                className="rounded-full"
                src={solInfo?.image!}
                alt=""
                width={20}
                height={20}
              />
            ) : (
              <NoImageDiv big={false} />
            )}
            {solInfo.symbol ? (
              <p className="text-white font-bold">
                {solInfo.symbol.replace(/\0.*$/g, "")}
              </p>
            ) : (
              <p className="text-white font-bold">{joinedPath}</p>
            )}
          </div>
          <input
            type="text"
            className=" text-right rtl bg-transparent text-gray-400 w-[calc(100%-130px)] border-0 border-transparent focus:outline-none"
          />
        </div>
      </div>
      {/* div for the second part */}
      <div className=" flex flex-col space-y-[5px] ">
        <p className=" text-gray-400 text-[12px]">Recipient</p>
        <div className=" py-3 px-2 bg-slate-800 rounded-sm w-full flex items-center">
          <input className=" bg-transparent text-gray-400 w-full border-0 border-transparent focus:outline-none" />
        </div>
      </div>
      <hr className="bg-gray-500 border-gray-500 mt-4 mb-4" />
      <div className=" cursor-pointer w-full py-3 flex items-center justify-center rounded-md bg-slate-600 text-white font-bold">
        <p>Send</p>
      </div>
    </div>
  );
}

// the compoent below is used for displaying the receipt part
export const ReceiveForm = ({
  solInfo,
  portfiolo,
}: {
  solInfo: Itoken;
  portfiolo: boolean;
}) => {
  return (
    <div>
      {/* the top div showing name and image of token */}
      <div className=" flex items-center space-x-2 text-white font-bold mb-3">
        {solInfo.name == "Solana" && portfiolo && (
          <Image src={solInfo.image!} alt="solana" width={25} height={25} />
        )}
        {solInfo.name && portfiolo ? (
          <p>
            Receive{" "}
            {`${solInfo.name.replace(/\0.*$/g, "")} (${solInfo.symbol?.replace(
              /\0.*$/g,
              ""
            )})`}
          </p>
        ) : (
          <div>{portfiolo ? <p>Receive Token</p> : <p>Receive</p>}</div>
        )}
      </div>
      <div>
        <hr />
      </div>
      {/* image showing the qrcode */}
      <QrcodeDiv sol={solInfo.symbol!} />
    </div>
  );
};

export const QrcodeDiv = ({ sol }: { sol: string }) => {
  const { copyaddress } = useCopy();
  const { pubkey } = useWallet();
  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const q = createQR(`${pubkey}`, 200, "white", "black");
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      q.append(qrRef.current);
    }
  }, [pubkey]);
  return (
    <div className=" mt-3 w-full flex flex-col gap-3 items-center">
      <div ref={qrRef} className=""></div>
      <div className=" w-full flex flex-col  item-center justify-center text-white content-center">
        <p className=" text-center">Your {sol == "Sol" && "Sol"} address</p>
        <p className=" text-[12px] text-center">{pubkey}</p>
      </div>
      <div>
        <div
          onClick={() => copyaddress()}
          className=" text-black w-fit px-6 py-2 bg-[tomato] rounded-md font-bold cursor-pointer"
        >
          <p>Copy address</p>
        </div>
      </div>
    </div>
  );
};
