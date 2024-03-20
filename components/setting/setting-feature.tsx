import React from "react";
import { GeneralLang } from "./setting-ui";
import { Separator } from "@/components/ui/separator";
import { Languages, Networks, Currencies } from "@/utils/statics";

export const SettingFeatures = () => {
  return (
    <div className=" w-full px-5 pt-5 pb-10 rounded-md bg-slate-700">
      <p className=" text-white font-bold text-lg mb-9">General</p>
      <GeneralLang
        item={Languages}
        title={"Language"}
        desc={"Choose your preferred language"}
        itemName="language"
      />
      <Separator className=" my-6" />
      <GeneralLang
        item={Currencies}
        title={"Currency"}
        desc={"Choose your preferred currency"}
        itemName="currency"
      />
      <Separator className=" my-6" />
      <GeneralLang
        item={Networks}
        title={"Network"}
        itemName="network"
        desc={
          "Choose between mainnet and other networks that are available for developer testing purposes"
        }
      />
    </div>
  );
};
