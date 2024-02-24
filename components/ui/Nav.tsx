import React from "react";
import Image from "next/image";
import { navItems } from "@/utils/statics";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

const Nav = () => {
  return (
    <div className=" w-full h-[120px] bg-slate-800 flex items-center justify-between px-3 sm:px-10 text-white border-b border-slate-500 transform">
      <Link href={"/wallet/portfiolo"}>
        <div className=" flex gap-2 items-center">
          <Image
            className=" w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
            src={"/thunder.png"}
            alt=""
            height={50}
            width={50}
          />
          <p className=" text-[12px] sm:text-[16px] sm:hidden lg:block">
            THUNDERSOL
          </p>
        </div>
      </Link>
      <div className=" hidden sm:flex  gap-4">
        {navItems.map((item, index) => (
          <div key={index}>
            <Link className=" text-md" href={`/wallet/${item.toLowerCase()}`}>
              {item}
            </Link>
          </div>
        ))}
      </div>
      <div className=" hidden  sm:flex items-center gap-2">
        <SettingsIcon />
        <div className=" w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-red-400"></div>
      </div>
      <div className=" flex sm:hidden">
        <MenuIcon />
      </div>
    </div>
  );
};

export default Nav;
