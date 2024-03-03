"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

import { SideSheet } from "../../utilities/SideSheet";
import { DropDownMenu } from "../../utilities/DropDown";
import { useCart, useStore } from "../../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import CartSheet from "../../utilities/cartSheet";
import WishlistSheet from "../../utilities/wishlistSheet";
export const TopNav = () => {
  const user = useStore(useShallow((state) => state.user));
  const cart = useCart(useShallow((state) => state.cart));
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full px-2 md:px-5 py-5 flex justify-between items-center">
      <SideSheet />
      <div className="relative w-[60%] lg:w-[50%] flex items-center gap-2">
        <Input
          placeholder=" Search for products by subcategory (e.g. hoodies, t-shirts) or brand name"
          className="outline-none"
          onFocus={(e) => {
            setShow(true);
          }}
          onBlur={(e) => setShow(false)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="text-black" />
        {show && (
          <div className="bg-white w-[95%] h-[100px] z-10 shadow-shadow rounded-lg absolute top-[100%] left-2 flex items-center justify-center">
            {<Loader2 className="animate-spin" />}
            <Products />
          </div>
        )}
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
          <Button className="bg-black text-white hover:bg-white hover:text-black transition-all font-bold rounded-xl">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

const Products = () => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
};
