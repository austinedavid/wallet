"use client";
import React from "react";
import { walletKeypair } from "@/utils/getWallet";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/utils/getsize";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSolInfo, userSubstring } from "./portfilo-data-access";

// the first div in the portfiolo component and also in the collection
export const SharedDiv = ({ solInfo }: { solInfo: Itoken }) => {
  return (
    <div className=" w-full md:h-[70px] sm:bg-slate-700 rounded-md px-4 py-2 flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-center sm:justify-between gap-2 sm:gap-0 ">
      <div className=" flex flex-col md:flex-row items-center gap-4 md:gap-8 h-full">
        <DivwithPrice />
        <div className="hidden md:block w-[1px] h-full bg-white"></div>
        <DivWithAddress />
      </div>
      <div>
        <RightFirst solInfo={solInfo} />
      </div>
    </div>
  );
};
// the div showing the sol price
export const DivwithPrice = () => {
  return (
    <div className=" flex flex-col sm:flex-row items-center gap-3">
      <div className=" w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-red-400"></div>
      <div className=" flex flex-col items-center sm:items-start">
        <p className=" text-gray-200 text-[12px]">Total portfolio value</p>
        <p className=" text-[20px] text-white">$346.09</p>
      </div>
    </div>
  );
};
// the div showing the address and copy
export const DivWithAddress = () => {
  return (
    <div className=" sm:flex space-x-2 hidden ">
      <AddressSubstring />
      <div className=" cursor-pointer w-[30px] h-[30px] flex items-center justify-center text-white rounded-full transition transform ease-in-out duration-500 hover:bg-slate-500">
        <ContentCopyIcon style={{ fontSize: 18 }} />
      </div>
      <div className=" cursor-pointer w-[30px] h-[30px] flex items-center justify-center text-white rounded-full transition transform ease-in-out duration-500 hover:bg-slate-500">
        <QrCodeIcon style={{ fontSize: 18 }} />
      </div>
    </div>
  );
};

// the div below we generated the subString for the application
export const AddressSubstring = () => {
  // const { pubkey } = walletKeypair();
  // const publicKey = pubkey().toString();
  const publicKey = "jsjsjsjsjsjjsjsjssj";
  //   below here we do the logics of generating the substring
  const firstPath = publicKey.substring(0, 4);
  const lastPath = publicKey.substring(publicKey.length - 4, publicKey.length);
  const joinedPath = `${firstPath}...${lastPath}`;
  return (
    <div>
      <p className=" text-white font-bold">{joinedPath}</p>
    </div>
  );
};

// the right part of the first div right part
export const RightFirst = ({ solInfo }: { solInfo: Itoken }) => {
  return (
    <div className=" flex gap-3 items-center">
      <TransactionBtn value={"Receive"} small={false} />
      <SendBtn solInfo={solInfo} small={false} />
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
  return (
    // items here should be in grid
    <div className=" flex items-center justify-between group md:grid md:grid-cols-5 py-4 px-2 border-b md:border-y border-gray-500 w-full md:hover:border-slate-800 md:hover:bg-slate-800 transform ease-in-out duration-500 cursor-pointer">
      <TokenNames data={data} />
      <div className="text-white hidden md:flex items-center">
        <p>{data.price}</p>
      </div>
      <div className=" text-white hidden md:flex items-center">
        {data.price && <p>{(data?.price! * data.amt).toFixed(2)}</p>}
      </div>
      <div className="text-white flex items-center">
        <p>{data.amt}</p>
      </div>
      <div className=" hidden items-center md:flex justify-end">
        <div className=" self-end flex items-center space-x-2 text-white">
          <div className=" hidden group-hover:block ease-in-out duration-300 transform">
            <SendBtn solInfo={data} small={true} />
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
export const TokenNames = ({ data }: { data: Itoken }) => {
  const { joinedPath } = userSubstring(data.address as string);
  return (
    <div className=" flex gap-2 items-center">
      {data.image ? (
        <div className=" w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center">
          <Image src={data.image!} alt="" width={30} height={30} />
        </div>
      ) : (
        <NoImageDiv big={true} />
      )}
      {data.name ? (
        <div>
          <p className=" text-white">{data.name}</p>
          <p className=" text-gray-400 text-[12px]">{data.symbol}</p>
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
        <DropdownMenuItem>View on explorer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// here we create the drawer button
export function SendBtn({
  small,
  solInfo,
}: {
  small: boolean;
  solInfo: Itoken;
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
            Send
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-900">
          <DialogHeader>
            <DialogTitle className="text-white">Send</DialogTitle>
          </DialogHeader>
          <SendForm solInfo={solInfo} />
        </DialogContent>
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
          Send
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-4 bg-slate-900">
        <DrawerHeader className="text-left">
          <DrawerTitle className=" text-white font-bold">Send</DrawerTitle>
        </DrawerHeader>
        <SendForm solInfo={solInfo} />
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
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
