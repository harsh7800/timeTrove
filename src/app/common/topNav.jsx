"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import TopNavLoader from "./TopNavLoader";

import Cookies from "js-cookie";
import { SideSheet } from "../utilities/SideSheet";
import { DropDownMenu } from "../utilities/DropDown";
import { useCart, useStore } from "../store/zustandStore";

export const TopNav = () => {
  const user = useStore((state) => state.user);
  const cart = useCart((state) => state.cart);
  console.log(cart);
  return (
    <Suspense fallback={<p>Loading topnav</p>}>
      <div className="relative w-full px-2 md:px-5 py-5 flex justify-between items-center">
        <SideSheet />
        <div className="w-[60%] lg:w-[50%] flex items-center gap-2">
          <Input
            placeholder="Search the Product"
            defaultValue={user.token}
            className="outline-none"
          />
          <Search className="text-black" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={`bg-[white] font-semibold rounded-xl hover:bg-grey.200 text-black`}
            onClick={() => disPatch(ChangeColorToBlack("#9900ff"))}
          >
            <span className="relative">
              <ShoppingCart />
              {cart && (
                <p className="absolute top-[-45%] bg-black text-xs px-2 text-white p-1 rounded-full right-[-50%]">
                  {Object.keys(cart).length || 0}
                </p>
              )}
            </span>
          </Button>
          {user.token ? (
            <div className="flex items-center gap-2">
              <DropDownMenu />
              <p className="font-bold hidden md:block">
                {user.username}
                {/* {state.username} */}
              </p>
            </div>
          ) : (
            <Button className="bg-grey text-black font-bold rounded-xl">
              Login
            </Button>
          )}
        </div>
      </div>
    </Suspense>
  );
};
