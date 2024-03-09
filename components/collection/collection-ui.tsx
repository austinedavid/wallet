"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import CloseIcon from "@mui/icons-material/Close";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PercentIcon from "@mui/icons-material/Percent";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { SendBtn } from "@/components/portfiolo/portfiolo-ui";
import { Itoken } from "@/utils/getTokens";
import Image from "next/image";
import Link from "next/link";
// this div handles the right part of the shared div
export const RightForCollection = ({ solInfo }: { solInfo: Itoken }) => {
  return (
    <div className="flex items-center gap-3">
      <SharedInputDiv />
      <FirstDropDown />
      <SendBtn
        portfiolo={false}
        value={"Receive"}
        solInfo={solInfo}
        small={false}
        isNft={false}
      />
      <More />
    </div>
  );
};

export const SharedInputDiv = () => {
  const [inputOpen, setinputopen] = useState<boolean>(false);
  const handleInputState = () => {
    setinputopen(!inputOpen);
  };
  return (
    <div className="flex space-x-2 items-center">
      <input
        className={` rounded-sm text-slate-300 caret-white outline-none focus:outline-none transition-all ease-in-out duration-300 w-[200px] bg-slate-900 p-2 ${
          inputOpen ? "block" : " hidden"
        }`}
        placeholder="Search..."
      />
      <div className=" w-8 h-8 rounded-full transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-800 flex items-center justify-center">
        {inputOpen ? (
          <div onClick={handleInputState}>
            <CloseIcon style={{ fontSize: 22 }} className=" text-white" />
          </div>
        ) : (
          <div onClick={handleInputState}>
            <SearchIcon style={{ fontSize: 22 }} className=" text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export const FirstDropDown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ControlCameraIcon style={{ fontSize: 22, color: "white" }} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-slate-900 text-white">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuItem className=" flex space-x-1 cursor-pointer">
            <AttachMoneyIcon />
            <p>Highest total Value</p>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex space-x-1 cursor-pointer">
            <LoyaltyIcon />
            <p>Highest floor Price</p>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex space-x-1 cursor-pointer">
            <PercentIcon />
            <p>Highest performance</p>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex space-x-1 cursor-pointer">
            <SortByAlphaIcon />
            <p>Alphabetically</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

// more icon and its drop down menu items
export const More = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertIcon style={{ fontSize: 22, color: "white" }} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-slate-900 text-white">
          <DropdownMenuItem className=" cursor-pointer">
            Select all
          </DropdownMenuItem>
          <DropdownMenuItem className=" cursor-pointer">
            Show spam
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

// main div that contians all the nft the owner has
export const AllNftDiv = ({ nfts }: { nfts: Itoken[] }) => {
  return (
    <div className=" w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {nfts?.map((nft, index) => (
        <EachNft key={index} nft={nft} />
      ))}
    </div>
  );
};

// each nft div
export const EachNft = ({ nft }: { nft: Itoken }) => {
  return (
    <div className=" group bg-slate-700 h-[320px] p-1 relative rounded-md hover:text-white cursor-pointer">
      <div className=" w-full h-5/6">
        <Link href={`/wallet/collectible/${nft.address}`}>
          <Image
            className=" w-full h-[100%]  rounded-md"
            src={`${nft.image}`}
            alt={`${nft?.name}`}
            width={200}
            height={200}
          />
        </Link>
        <div className=" opacity-0 transition-opacity ease-in-out duration-300 group-hover:opacity-100 absolute w-[30px] h-[30px] rounded-full border-2 cursor-pointer border-white top-3 left-3"></div>
      </div>
      <div className=" w-full h-1/6 flex items-center justify-center">
        <p className=" text-white font-bold">
          {nft.name!.replace(/\0.*$/g, "")}
        </p>
      </div>
    </div>
  );
};

// the div that should be rendered when nft does not exist
export const NoNft = ({ solInfo }: { solInfo: Itoken }) => {
  return (
    <div className=" w-[300px] sm:w-[500px] flex items-center justify-center  flex-col mt-[70px] mx-auto">
      <Image src={"/noNft.svg"} alt="" width={200} height={200} />
      <div className=" -mt-top-[200px] flex flex-col items-center">
        <p className=" text-white">You do not have any collectibles yet</p>
        <div className=" w-fit flex mx-auto">
          <SendBtn
            portfiolo={false}
            value={"Receive"}
            solInfo={solInfo}
            small={false}
            isNft={false}
          />
        </div>
      </div>
    </div>
  );
};
