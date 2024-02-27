"use client";
import { userSubstring } from "../portfiolo/portfilo-data-access";
import { Itoken } from "@/utils/getTokens";
import Link from "next/link";
// here we export all the components that will be consumed by the spec page
export const Breadcrum = ({ onetoken }: { onetoken: Itoken }) => {
  const { joinedPath } = userSubstring(onetoken.address as string);
  return (
    <div className=" flex items-center space-x-2 text-gray-400 text-[12px] mb-6">
      <Link href={"/wallet/portfiolo"} className=" text-white hover:underline">
        portfiolo
      </Link>
      <p>/</p>
      {onetoken.name ? (
        <p>{onetoken.name.replace(/\0.*$/g, "")}</p>
      ) : (
        <p>{joinedPath}</p>
      )}
    </div>
  );
};
