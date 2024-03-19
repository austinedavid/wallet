"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { navItems } from "@/utils/statics";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import MenuNav from "./MenuNav";

const Nav = () => {
  const [menuOpen, setmenuOpen] = useState<boolean>(false);
  const path = usePathname();
  const currentPath = path.split("/")[2];
  const divRef = useRef(null);
  const handleHideDiv = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === divRef.current) {
      setmenuOpen(false);
    }
  };
  return (
    <div className=" w-full overflow-x-clip">
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
        <div className=" hidden sm:flex  gap-6">
          {navItems.map((item, index) => (
            <MenuNav
              key={index}
              item={item}
              currentPath={currentPath}
              setmenuOpen={setmenuOpen}
            />
          ))}
        </div>
        <div
          className={` hidden  sm:flex items-center gap-2 ${
            currentPath == "setting" ? "text-[tomato]" : "text-white"
          }`}
        >
          <Link href={"/wallet/setting"}>
            <SettingsIcon />
          </Link>
          <div className=" w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-red-400"></div>
        </div>
        <div onClick={() => setmenuOpen(!menuOpen)} className=" flex sm:hidden">
          <MenuIcon />
        </div>
      </div>
      {/* here we handle sidebar generation */}
      <div
        onClick={handleHideDiv}
        ref={divRef}
        className={` ${
          menuOpen ? "flex" : "hidden"
        } left-0 top-0 fixed w-full h-screen rgba opacity-100 z-50 sm:hidden transition-all duration-300 ease-in-out justify-end`}
      >
        <div className=" w-5/12 h-full bg-slate-900 flex flex-col gap-5 py-5 text-white px-3">
          {navItems.map((item, index) => (
            <MenuNav
              key={index}
              item={item}
              currentPath={currentPath}
              setmenuOpen={setmenuOpen}
            />
          ))}
          <div className=" mt-3 w-full flex justify-center items-center">
            <div
              className={`flex items-center gap-2 ${
                currentPath == "setting" ? "text-[tomato]" : "text-white"
              }`}
            >
              <Link onClick={() => setmenuOpen(false)} href={"/wallet/setting"}>
                <SettingsIcon />
              </Link>
              <div className=" w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-red-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
