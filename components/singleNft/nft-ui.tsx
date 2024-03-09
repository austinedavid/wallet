"use client";
import React, { useState } from "react";
import { Itoken } from "@/utils/getTokens";
import { SendBtn } from "../portfiolo/portfiolo-ui";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import DownloadIcon from "@mui/icons-material/Download";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useDownload } from "./nft-data-access";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";

// exporting the top div in the individual nft page
export const Topdiv = ({ nft }: { nft: Itoken }) => {
  return (
    <div className=" w-full px-6 py-3 sm:bg-slate-700 flex flex-col sm:flex-row gap-2 items-center justify-center sm:justify-between rounded-md">
      <div>
        <p className=" text-white font-bold text-lg">
          {nft.name!.replace(/\0.*$/g, "")}
        </p>
      </div>
      <div>
        <RightTop nft={nft} />
      </div>
    </div>
  );
};

export const RightTop = ({ nft }: { nft: Itoken }) => {
  return (
    <div className=" flex items-center gap-4">
      <SendBtn
        solInfo={nft}
        small={false}
        isNft={true}
        value={"Send"}
        portfiolo={false}
      />
      <MoreDots nft={nft} />
    </div>
  );
};

// this div consists of the things we need
// for sending NFT to a particlar receiver
export const NftSendBtnDiv = ({ solInfo }: { solInfo: Itoken }) => {
  // state to control the copied icon
  const [copy, setcopy] = useState<boolean>(false);
  const [address, setaddress] = useState<string>("");
  const handleCopy = async () => {
    setcopy(true);
    const clipboardItem = await window.navigator.clipboard.readText();
    setaddress(clipboardItem);
    setTimeout(() => {
      setcopy(false);
    }, 1000);
  };
  return (
    <div>
      <div className=" flex flex-col gap-2 mt-2">
        <hr className="bg-slate-500 border-slate-500" />
        {/* the div containing the input for the address */}
        <div className=" flex flex-col mt-2">
          <p className=" text-gray-300 text-[12px] mb-1">Recipient</p>
          <div className=" flex border border-slate-500 px-2 py-3 rounded-md">
            <input
              className=" outline-none hover:outline-none bg-transparent text-white flex10"
              placeholder="Enter or paste address"
              onChange={(e) => setaddress(e.target.value)}
              value={address}
            />
            <div
              onClick={handleCopy}
              className=" flex2 text-white  flex items-center justify-end cursor-pointer"
            >
              {copy ? (
                <p className=" text-green-400 text-[13px]">pasted</p>
              ) : (
                <ContentCopyIcon style={{ fontSize: 12 }} />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* the div containing the picture of the nft */}
      <div className=" mt-10 flex flex-col gap-1">
        <p className=" text-gray-300 text-[12px]">Collectible</p>
        <div className=" border h-[70px] border-slate-500 rounded-md px-2 py-2 flex w-full">
          <div className=" h-[100%]">
            <Image
              className=" h-[100%] w-[50px] object-cover rounded-sm"
              src={`${solInfo.image}`}
              height={20}
              width={20}
              alt={`${solInfo.name}`}
            />
          </div>
          <div className=" text-white ml-2">
            <p className=" text-[14px]">
              {solInfo.name!.replace(/\0.*$/g, "")}
            </p>
            <p className=" text-gray-300 text-[14px]">
              {solInfo.symbol!.replace(/\0.*$/g, "")}
            </p>
          </div>
        </div>
      </div>
      <hr className=" mt-4 bg-slate-500 border-slate-500" />
      <div
        className={` mt-4 w-full py-3 flex items-center justify-center ${
          address.length == 44
            ? "bg-[tomato] text-white"
            : "bg-gray-600 text-gray-400"
        } rounded-md cursor-pointer`}
      >
        <p className=" ">Send</p>
      </div>
    </div>
  );
};

export const MoreDots = ({ nft }: { nft: Itoken }) => {
  const { handleDownload, goToExplorer } = useDownload();
  //   handle image downlaod
  const downloadNow = () => {
    handleDownload(
      nft.image as string,
      nft.name!.replace(/\0.*$/g, "") as string
    );
  };
  //   handle navigation to the explorer
  const handleExplorer = () => {
    goToExplorer(nft.address as string);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertOutlinedIcon style={{ fontSize: 23, color: "white" }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-slate-900 text-white">
        <DropdownMenuItem className=" cursor-pointer flex gap-2">
          <AccountCircleIcon />
          <p>Set as PFP</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleExplorer}
          className=" cursor-pointer flex gap-2"
        >
          <LanguageIcon />
          <p>View in explorer</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={downloadNow}
          className=" cursor-pointer flex gap-2"
        >
          <DownloadIcon />
          <p>Download</p>
        </DropdownMenuItem>
        <DropdownMenuItem className=" cursor-pointer flex gap-2 text-red-700">
          <ReportGmailerrorredIcon />
          <p>Mark as spam</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// the div below contains the picture  and description of the NFT
export const NftDetails = ({ nft }: { nft: Itoken }) => {
  return (
    <div className=" w-full mt-4 flex flex-col sm:flex-row gap-4">
      <div className=" flex-1 h-[400px] md:h-[400px]  lg:h-screen">
        <Image
          src={`${nft.image}`}
          alt={`${nft.name}`}
          width={200}
          height={200}
          className=" w-full h-[100%] rounded-md"
        />
      </div>
      <div className=" flex-1 rounded-md overflow-hidden">
        <div className=" w-full p-4 bg-slate-700 rounded-md">
          <p className=" text-slate-300">
            this is ehere the discription of everything appears to keep
            everything very short we will find it soon
          </p>
        </div>
      </div>
    </div>
  );
};
