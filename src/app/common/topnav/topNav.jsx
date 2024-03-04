"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";

import { SideSheet } from "../../utilities/SideSheet";
import { DropDownMenu } from "../../utilities/DropDown";
import { useCart, useStore } from "../../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import CartSheet from "../../utilities/cartSheet";
import WishlistSheet from "../../utilities/wishlistSheet";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
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
        {show && search.length != 0 && (
          <div className="bg-white w-[80svw] sm:w-[95%] h-[fit] max-h-[400px] scroll overflow-scroll z-10 shadow-shadow rounded-lg absolute top-[100%] left-2 flex justify-center py-4">
            <Products search={search} />
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

const Products = ({ search }) => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct`, {
      cache: "reload",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      {data.length != 0 ? (
        <div className="space-y-4 h-full">
          {data
            .filter((item) => {
              const searchText = search.toLowerCase();
              if (searchText === "") {
                return []; // include all items when search is empty
              } else if (
                item.brand?.toLowerCase().includes(searchText) ||
                item.title?.toLowerCase().includes(searchText) ||
                item.subCategory?.toLowerCase().includes(searchText)
              ) {
                return item;
              }
            })
            .map((item, i) => (
              <div
                onClick={() => router.push(`/shop/product/${item.slug}`)}
                key={i}
                className="w-full sm:w-auto flex items-center gap-2 hover:cursor-pointer hover:border px-4 py-3 rounded-md"
              >
                <Image
                  width={200}
                  height={200}
                  className="w-20 border rounded-lg"
                  src={item.img}
                  alt="product"
                />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <h3 className="font-bold">Rs {item.price}</h3>
                </div>
              </div>
            ))}
          {data.filter((item) => {
            const searchText = search.toLowerCase();
            return (
              item.brand?.toLowerCase().includes(searchText) ||
              item.title?.toLowerCase().includes(searchText) ||
              item.subCategory?.toLowerCase().includes(searchText)
            );
          }).length === 0 && <p>No results found.</p>}
        </div>
      ) : (
        <Loader2 className="animate-spin" size={20} />
      )}
    </Suspense>
  );
};
