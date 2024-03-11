import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// the div for general and for language
export const GeneralLang = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className=" flex items-center justify-between">
      <div>
        <p className=" text-lg text-white font-bold">{title}</p>
        <p className=" text-slate-300 text-[15px]">{desc}</p>
      </div>
      <SelectBtn />
    </div>
  );
};

// the selection button below
export const SelectBtn = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-slate-600 border-transparent text-white font-bold">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className=" bg-slate-600 focus:outline-none focus:bg-slate-600 text-white font-bold">
        <SelectItem className=" hover:bg-slate-700" value="light">
          Light
        </SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
