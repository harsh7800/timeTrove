import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export const TopNav = () => {
  return (
    <div className="w-full px-5 py-5 space-y-5">
      <div className=" flex justify-between items-center">
        <div className="w-[50%] flex items-center gap-3">
          <Input placeholder="Search the Product" />
          <Button className="bg-white hover:bg-white">
            <Search className="text-black" />
          </Button>
        </div>
        <div className="flex items-center gap-5">
          <Button className="bg-[#f2f2f2] font-semibold rounded-xl hover:bg-grey.200 text-black">
            <span className="relative">
              <ShoppingCart />
              <p className="absolute top-[-45%] bg-black text-xs px-2 text-white p-1 rounded-full right-[-50%]">
                3
              </p>
            </span>
            &nbsp;&nbsp; Cart
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="bg-[#f2f2f2] hover:bg-grey.200 text-black font-bold cursor-pointer select-none transition-colors">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback className="uppercase">H</AvatarFallback>
            </Avatar>
            <p className="font-bold">Harsh</p>
          </div>
        </div>
      </div>
    </div>
  );
};
