"use client";
import { Itoken } from "@/utils/getTokens";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Itoken>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price/24hrs Change",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "amt",
    header: "Amount",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
