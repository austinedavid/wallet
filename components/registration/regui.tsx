"use client";
import Image from "next/image";
import Link from "next/link";
import { useMnemonic } from "./reg-data-access";
import React, { useState, Dispatch, SetStateAction } from "react";
import { seedArray } from "./types";
import { Input } from "../ui/input";

export const RightPart = () => {
  return <div className=" flex-1 h-full bg-slate-950">right part</div>;
};

interface setPage {
  setpage: Dispatch<SetStateAction<number>>;
  seedArray: string[];
}
export const LeftPart = () => {
  const [page, setpage] = useState<number>(0);
  const { mnemoicArray } = useMnemonic();
  return (
    <div className=" flex-1 h-full bg-slate-900 text-white px-4 relative pb-2">
      <Nav />
      <Fewtext page={page} />
      {/* here we render the dynamic changing part of this page below based on the state on page we have */}
      {page == 0 ? (
        <GeneratePhrase seedArray={mnemoicArray} setpage={setpage} />
      ) : page == 1 ? (
        <ConfirmPhrase seedArray={mnemoicArray} setpage={setpage} />
      ) : (
        <Enterpassword />
      )}
      {/* already have a wallet section */}
      <AlreadyHaveWallet />
    </div>
  );
};
// the nav for the left side of the home page generated
export const Nav = () => {
  return (
    <div className=" w-full h-[90px] ">
      <Link className=" w-full h-full flex items-center gap-2" href={"/"}>
        <Image width={30} height={30} src="/thunder.png" alt="" />
        <p className=" font-bold">THUNDERSOL</p>
      </Link>
    </div>
  );
};
// the first few text before the main seed phrase
export const Fewtext = ({ page }: { page: number }) => {
  return (
    <>
      {page == 0 ? (
        <div className="">
          <h3>Write down your Recovery Phrase</h3>
          <p className=" text-sm">You will need it on the next step</p>
        </div>
      ) : page == 1 ? (
        <div>
          <h3>Please enter or paste the Phrase you copied</h3>
          <p className="text-sm">
            Remember thundersol will never ask about your phrase
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
// the generate phrase part
export const GeneratePhrase = ({ seedArray, setpage }: setPage) => {
  return (
    <>
      <div className=" mt-4 w-full p-4 border-[0.5px] border-slate-500">
        <div className=" grid grid-cols-3 gap-2">
          {seedArray.map((value, index) => (
            <div className=" flex gap-3" key={index}>
              <p>{index + 1}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
        <hr className="mt-2 mb-4 bg-slate-500 border-slate-500" />
        <div className=" flex items-center justify-between ">
          <div>
            <p className=" text-[tomato] font-bold cursor-pointer">COPY</p>
          </div>
          <div>
            <p className=" text-[tomato] font-bold cursor-pointer">DOWNLOAD</p>
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center  mt-[60px] cursor-pointer">
        <div
          onClick={() => setpage(1)}
          className=" ease-in-out duration-700 transition px-4 py-2 bg-gradient-to-r from-[tomato] to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-[tomato]  rounded-md"
        >
          <p>I SAVED MY RECOVERY PHRASE</p>
        </div>
      </div>
    </>
  );
};
// confirm the phrase
export const ConfirmPhrase = ({ seedArray, setpage }: setPage) => {
  const [words, setword] = useState(Array(seedArray.length).fill(""));
  // lets fill in the array of word state with this function
  const handleWordFill = (index: number, word: string) => {
    const newword = [...words];
    newword[index] = word;
    setword(newword);
  };
  // here, we verify if the both arrays are the same
  const handleConfirm = () => {
    const firstArrays = seedArray.join(" ");
    const secondArrays = words.join(" ");
    if (firstArrays != secondArrays) {
      return alert("not equal");
    }
    setpage(2);
  };
  return (
    <>
      <div className=" grid grid-cols-3 gap-3 mt-4">
        {seedArray.map((seed, index) => (
          <div
            className=" flex items-center justify-between md:px-10"
            key={index}
          >
            <p className=" text-slate-200">{index + 1}</p>
            <Input
              className=" w-[80%] text-slate-200 bg-slate-600 "
              value={words[index]}
              onChange={(e) => handleWordFill(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="w-full items-center justify-center flex mt-8">
        <div
          onClick={handleConfirm}
          className=" cursor-pointer flex items-center justify-center w-[50%] md:w-[40%] ease-in-out duration-700 transition px-4 py-2 bg-gradient-to-r from-[tomato] to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-[tomato]  rounded-md"
        >
          <p className=" text-[12px] md:text-[18px]">CONFIRM PHRASE</p>
        </div>
      </div>
    </>
  );
};
// enter password part
// this is the last part of the authentication process
export const Enterpassword = () => {
  return (
    <div className=" mt-24 flex flex-col gap-4">
      <p>Set a password for your wallet</p>
      <div className=" bg-slate-800 px-8 py-10 flex flex-col gap-2">
        <Input
          className=" bg-transparent border-x-0 border-t-0  focus:outline-none"
          type="text"
          placeholder="New Password"
        />
        <Input
          className=" bg-transparent border-x-0 border-t-0  focus:outline-none"
          type="text"
          placeholder="Repeat Password"
        />
      </div>
      <div className=" w-full flex items-center justify-center">
        <div className=" cursor-pointer flex items-center justify-center w-[50%] md:w-[40%] ease-in-out duration-700 transition px-4 py-2 bg-gradient-to-r from-[tomato] to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-[tomato]  rounded-md">
          <p className=" text-[12px] md:text-[18px]">CONTINUE</p>
        </div>
      </div>
    </div>
  );
};

// already have a wallet section
export const AlreadyHaveWallet = () => {
  return (
    <div className=" w-full flex items-center justify-center md:absolute md:bottom-4 md:left-auto">
      <div className=" flex mt-[50px] gap-2">
        <p>Already have a wallet?</p>
        <p className=" text-[tomato] cursor-pointer">Access it here</p>
      </div>
    </div>
  );
};
