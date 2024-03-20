import Nav from "@/components/ui/Nav";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const userCookies = cookies();
  const secreteKey = userCookies.get("secrete-seed")?.value;
  if (!secreteKey) return redirect("/");
  return (
    <div className=" w-full">
      <Nav />
      {children}
    </div>
  );
};

export default layout;
