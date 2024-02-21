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
import { useShallow } from "zustand/react/shallow";
import CartSheet from "../utilities/cartSheet";
import WishlistSheet from "../utilities/wishlistSheet";
export const TopNav = () => {
  const user = useStore(useShallow((state) => state.user));
  const cart = useCart(useShallow((state) => state.cart));
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
        <div className="flex items-center gap-4">
          <CartSheet />
          <WishlistSheet />
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
