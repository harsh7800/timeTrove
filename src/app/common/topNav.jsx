"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { Suspense, useEffect } from "react";
import TopNavLoader from "./TopNavLoader";
import { useDispatch, useSelector } from "react-redux";
import { ChangeColorToBlack } from "../store/slice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AsideNav } from "./asideNav";

export const TopNav = () => {
  const state = useSelector((state) => state.LoginAuth.user);
  const disPatch = useDispatch();

  return (
    <Suspense fallback={<TopNavLoader />}>
      <div className="w-full px-2 md:px-5 py-5 space-y-5">
        <div className=" flex justify-between items-center">
          <SideSheet />
          <div className="w-[60%] lg:w-[50%] flex items-center gap-0">
            <Input placeholder="Search the Product" className="outline-none" />
            <Button className="bg-white hover:bg-white">
              <Search className="text-black" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className={`bg-[${state}] font-semibold rounded-xl hover:bg-grey.200 text-black`}
              onClick={() => disPatch(ChangeColorToBlack("#9900ff"))}
            >
              <span className="relative">
                <ShoppingCart />
                <p className="absolute top-[-45%] bg-black text-xs px-2 text-white p-1 rounded-full right-[-50%]">
                  3
                </p>
              </span>
            </Button>
            {localStorage.getItem("user") ? (
              <div className="flex items-center gap-2">
                <Avatar className="bg-[#f2f2f2] hover:bg-grey.200 text-black font-bold cursor-pointer select-none transition-colors">
                  <AvatarImage src="" alt="@shadcn" />
                  <AvatarFallback className="uppercase">
                    <User />
                  </AvatarFallback>
                </Avatar>
                <p className="font-bold hidden md:block">
                  {localStorage.getItem("user").username || state.username}
                </p>
              </div>
            ) : (
              <Button className="bg-grey text-black font-bold rounded-xl">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

const SideSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white w-[300px] h-[100vh] min-h-[750px]"
      >
        <AsideNav mobile={true} />
      </SheetContent>
    </Sheet>
  );
};
