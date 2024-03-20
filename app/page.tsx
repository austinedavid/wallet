import React from "react";
import Regfeatures from "@/components/registration/reg-features";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = () => {
  const getCookies = cookies();
  const user = getCookies.get("secrete-seed")?.value;
  if (user) return redirect("/wallet/portfiolo");
  return (
    <div>
      <Regfeatures />
    </div>
  );
};

export default page;
