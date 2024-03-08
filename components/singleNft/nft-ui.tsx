"use client";
import React from "react";
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

export const NftSendBtnDiv = ({ solInfo }: { solInfo: Itoken }) => {
  return (
    <div>
      <p>for the collectibles</p>
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
