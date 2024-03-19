import React from "react";
import { Isettings } from "@/utils/statics";
import Link from "next/link";

const MenuNav = ({
  item,
  currentPath,
  setmenuOpen,
}: {
  item: string;
  currentPath: string;
  setmenuOpen: any;
}) => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <Link
        onClick={() => setmenuOpen(false)}
        className={` text-md ${
          currentPath == item.toLocaleLowerCase() && " text-[tomato]"
        } `}
        href={`/wallet/${item.toLowerCase()}`}
      >
        {item}
      </Link>
      <div
        className={`${
          currentPath == item.toLocaleLowerCase() ? "block" : "hidden"
        } mt-[-4px] w-[6px] h-[6px] rounded-full bg-[tomato]`}
      ></div>
    </div>
  );
};

export default MenuNav;
