"use client";
import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import ShieldIcon from "@mui/icons-material/Shield";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { settingItems } from "@/utils/statics";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const path = usePathname();
  const lastItem = path.split("/");
  const theRoute = lastItem[lastItem.length - 1];

  return (
    <div className=" mt-6">
      <p className=" text-white font-bold text-lg">Settings</p>
      <div className=" w-full pl-4 flex flex-col gap-6 mt-6">
        {settingItems.map((item, index) => (
          <Link
            href={`${
              item.path == "setting"
                ? "/wallet/setting"
                : `/wallet/setting/${item.path}`
            }`}
            className={` text-black flex gap-2 text-lg ${
              item.path == theRoute ? " text-white" : "text-slate-400"
            }`}
            key={index}
          >
            <item.icon />
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
