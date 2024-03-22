"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "../registration/reg-data-access";

// the div for general and for language
export const GeneralLang = ({
  title,
  desc,
  item,
  itemName,
}: {
  title: string;
  desc: string;
  item: string[];
  itemName: string;
}) => {
  return (
    <div className=" flex items-center justify-between gap-1">
      <div>
        <p className=" text-lg text-white font-bold">{title}</p>
        <p className=" text-slate-300 text-[10px] sm:text-[15px]">{desc}</p>
      </div>
      <SelectBtn item={item} itemName={itemName} />
    </div>
  );
};

// the selection button below
export const SelectBtn = ({
  item,
  itemName,
}: {
  item: string[];
  itemName: string;
}) => {
  const { getSettings, setSettings } = useSettings();
  const storedValue = getSettings(itemName);
  const handlesetting = (value: string) => {
    setSettings(itemName, value);
  };
  return (
    <Select onValueChange={(value) => handlesetting(value)}>
      <SelectTrigger className="w-[180px] bg-slate-600 border-transparent text-white font-bold">
        <SelectValue placeholder={storedValue} />
      </SelectTrigger>
      <SelectContent className=" bg-slate-600 focus:outline-none focus:bg-slate-600 text-white font-bold">
        {item.map((item, index) => (
          <SelectItem
            key={index}
            className=" hover:bg-slate-700 flex justify-between"
            value={item}
          >
            <p>{item}</p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
