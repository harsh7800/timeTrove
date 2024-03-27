"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Copy, Info } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import React from "react";

const OrderDopdown = ({ orderID }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Info size={20} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] space-y-1 shadow-shadow-2  py-2 rounded-lg border text-start bg-white">
        <DropdownMenuLabel className="font-semibold mx-2">
          My Order
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="mt-2 space-y-1">
          <DropdownMenuItem
            className="cursor-pointer hover:bg-grey w-full p-2 flex items-center gap-2"
            onClick={() => navigator.clipboard.writeText(orderID)}
          >
            OrderID <Copy size={15} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-grey w-full p-2"
            onClick={() => router.push(`/shop/account/${orderID}`)}
          >
            Track Order
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderDopdown;
