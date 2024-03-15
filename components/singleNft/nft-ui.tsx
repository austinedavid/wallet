"use client";
import React, { useState } from "react";
import { Itoken } from "@/utils/getTokens";
import { NoImageDiv, SendBtn } from "../portfiolo/portfiolo-ui";
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
import { useDownload, useSubstringFour } from "./nft-data-access";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";
import TelegramIcon from "@mui/icons-material/Telegram";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

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
export const NftSendBtnDiv = ({
  solInfo,
  setnotConfirm,
}: {
  solInfo: Itoken;
  setnotConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // state to control the copied icon
  const [copy, setcopy] = useState<boolean>(false);
  const [address, setaddress] = useState<string>("");
  const [toConfirm, setToconfirm] = useState<boolean>(false);
  const [amt, setamt] = useState<number>(10e-9);
  return (
    <div>
      {toConfirm ? (
        <ConfirmDiv
          amt={amt}
          nft={true}
          sol={false}
          address={address}
          solInfo={solInfo}
        />
      ) : (
        <SendNftDiv
          copy={copy}
          address={address}
          solInfo={solInfo}
          setcopy={setcopy}
          setaddress={setaddress}
          setToconfirm={setToconfirm}
          setnotConfirm={setnotConfirm}
        />
      )}
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
          <p className=" text-slate-400">Description</p>
          <p className=" text-slate-300">
            this is ehere the discription of everything appears to keep
            everything very short we will find it soon
          </p>
        </div>
      </div>
    </div>
  );
};

// this is the div that shows transfer nft before the confirm nft part
interface SendInterface {
  setcopy: React.Dispatch<React.SetStateAction<boolean>>;
  solInfo: Itoken;
  setaddress: React.Dispatch<React.SetStateAction<string>>;
  setToconfirm: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
  copy: boolean;
  setnotConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SendNftDiv = ({
  solInfo,
  setcopy,
  setaddress,
  setToconfirm,
  address,
  copy,
  setnotConfirm,
}: SendInterface) => {
  const handleCopy = async () => {
    setcopy(true);
    const clipboardItem = await window.navigator.clipboard.readText();
    setaddress(clipboardItem);
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
            <div className=" flex2 text-white  flex items-center justify-end cursor-pointer">
              {copy ? (
                <CloseIcon
                  onClick={() => {
                    setcopy(false);
                    setaddress("");
                  }}
                  style={{ fontSize: 14 }}
                />
              ) : (
                <ContentCopyIcon
                  onClick={handleCopy}
                  style={{ fontSize: 12 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* the div containing the picture of the nft */}
      <NftSmallCard amt={1} nft={true} noMargin={false} solInfo={solInfo} />
      <hr className=" mt-4 bg-slate-500 border-slate-500" />
      <div
        className={` mt-4 w-full py-3 flex items-center justify-center ${
          address.length == 44
            ? "bg-[tomato] text-white"
            : "bg-gray-600 text-gray-400"
        } rounded-md cursor-pointer`}
        onClick={() => {
          setToconfirm(true);
          setnotConfirm(false);
        }}
      >
        <p className=" ">Send</p>
      </div>
    </div>
  );
};

export const NftSmallCard = ({
  solInfo,
  noMargin,
  nft,
  amt,
}: {
  solInfo: Itoken;
  noMargin: boolean;
  nft: boolean;
  amt: number;
}) => {
  const { joinString } = useSubstringFour(solInfo.address as string);
  return (
    <div className={` ${!noMargin && " mt-10"} flex flex-col gap-1`}>
      {!noMargin && <p className=" text-gray-300 text-[12px]">Collectible</p>}
      <div
        className={` ${
          !noMargin
            ? "border-slate-500 border rounded-md px-2 py-2 h-[70px]"
            : " h-[50px]"
        } flex w-full items-center`}
      >
        <div className={`h-[100%]`}>
          {/* show token image or sol images or don't show image if tokens dont have */}
          {nft || solInfo.image ? (
            <Image
              className={`h-[100%] w-[50px] object-cover ${
                nft ? "rounded-sm" : " rounded-full"
              }`}
              src={`${solInfo.image}`}
              height={20}
              width={20}
              alt={`${solInfo.name}`}
            />
          ) : (
            <NoImageDiv big={false} />
          )}
        </div>
        <div className=" text-white ml-2">
          {/* leave below at it default for nft and then change for sol and other token with the amt and symbol (1 SOL) */}
          {nft ? (
            <div>
              <p className=" text-[14px]">
                {solInfo.name!.replace(/\0.*$/g, "")}
              </p>
              <p className=" text-gray-300 text-[14px]">
                {solInfo.symbol!.replace(/\0.*$/g, "")}
              </p>
            </div>
          ) : (
            <div className=" flex items-center space-x-1">
              <p>{amt}</p>
              {solInfo.symbol ? (
                <p>{solInfo.symbol!.replace(/\0.*$/g, "")}</p>
              ) : (
                <p>{joinString}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// this div handles the confirmation of the nft sending
export const ConfirmDiv = ({
  solInfo,
  address,
  nft,
  sol,
  amt,
}: {
  solInfo: Itoken;
  address: string;
  nft: boolean;
  sol: boolean;
  amt: number;
}) => {
  return (
    <div className=" w-full justify-center items-center flex flex-col gap-4">
      <p className=" text-white font-bold">Confirm Transaction</p>
      <SendMidleDiv
        amt={amt}
        sol={sol}
        nft={nft}
        address={address}
        solInfo={solInfo}
      />
    </div>
  );
};

export const SendMidleDiv = ({
  solInfo,
  address,
  sol,
  nft,
  amt,
}: {
  solInfo: Itoken;
  address: string;
  sol: boolean;
  nft: boolean;
  amt: number;
}) => {
  const { joinString } = useSubstringFour(address);
  return (
    <div className=" w-full flex flex-col justify-center items-center gap-3 ">
      <div className=" text-white w-[80px] h-[80px] bg-slate-500 h-50 rounded-full flex items-center justify-center">
        <TelegramIcon style={{ fontSize: 30 }} />
      </div>

      <div className="w-full p-2 flex flex-col item-start border border-slate-500 gap-2 rounded-md ">
        <NftSmallCard amt={amt} nft={nft} noMargin={true} solInfo={solInfo} />
        <div className="items-start flex flex-col ml-3">
          <KeyboardArrowDownIcon className=" text-slate-400" />
          <KeyboardArrowDownIcon className=" text-white -mt-3" />
        </div>
        <div className=" flex items-center gap-1 -mt-2">
          <div className=" ml-[3px] w-[40px] h-[40px] rounded-full bg-gradient-to-r from-slate-300 to-[tomato]"></div>
          <p className="  text-slate-200 text-sm">{joinString}</p>
        </div>
      </div>
      {/* the send NFT final button below here */}
      <div className=" w-full flex gap-3 mt-6">
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", duration: 1 }}
          className=" cursor-pointer font-bold  p-3 flex items-center justify-center text-white bg-slate-600 rounded-md flex-1"
        >
          <p>Cancel</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", duration: 2 }}
          className=" cursor-pointer font-bold  p-3 flex items-center justify-center black bg-[tomato] rounded-md flex-1"
        >
          <p>Confirm</p>
        </motion.div>
      </div>
    </div>
  );
};
