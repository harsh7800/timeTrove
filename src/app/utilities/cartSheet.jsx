"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

import React from "react";
import { useCart } from "../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DrawerClose } from "@/components/ui/drawer";
import { QuickBuyProductCard } from "./productCard";
import { Checkout, addToCart, removeFromCart } from "../helpers/functions";
import { useStore } from "zustand";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

export default function CartSheet() {
  const cart = useCart(useShallow((state) => state.cart));
  const updateSubTotal = useCart(useShallow((state) => state.updateSubTotal));
  const subTotal = useCart(useShallow((state) => state.subTotal));
  const clearCart = useCart(useShallow((state) => state.clearCart));
  const Router = useRouter();
  const path = usePathname();
  console.log(cart);
  return (
    <Sheet>
      <SheetTrigger>
        {!path.toLocaleLowerCase().includes("checkout") && (
          <div className="relative">
            <ShoppingCart />
            {Object.keys(cart)?.length != 0 && (
              <p className="animate-bounce absolute top-[-45%] bg-purple text-xs px-2 text-white font-bold p-1 rounded-full right-[-40%]">
                {Object.keys(cart)?.length || 0}
              </p>
            )}
          </div>
        )}
      </SheetTrigger>
      <SheetContent className="bg-white h-[100dvh]">
        <SheetHeader>
          <SheetTitle className="font-bold">Welcome to the cart</SheetTitle>
        </SheetHeader>
        {Object.keys(cart).length > 0 ? (
          <div className="flex justify-center items-start gap-5 h-full">
            <div className="w-full sm:w-[500px] my-5 shadow-md p-4 rounded-lg">
              <h3 className="font-bold w-full text-start">Your Order</h3>
              <div className="space-y-6 min-h-[300px] max-h-[55dvh] overflow-y-scroll bg-white scroll mt-2">
                {Object.keys(cart).map((data, index) => {
                  return (
                    <QuickBuyProductCard
                      variant={cart[data].size}
                      colour={cart[data].variant}
                      key={index}
                      img={cart[data].img}
                      productTitle={cart[data].name}
                      price={cart[data].price}
                      qty={cart[data].qty}
                      totalAmount={subTotal}
                      addToCart={() =>
                        addToCart(
                          cart,
                          data,
                          1,
                          cart[data].price,
                          cart[data].title,
                          cart[data].size,
                          cart[data].color,
                          cart[data].img,
                          updateSubTotal
                        )
                      }
                      removeFromCart={() =>
                        removeFromCart(cart, data, 1, updateSubTotal)
                      }
                    />
                  );
                })}
              </div>
              <div className="w-full">
                <div className="w-full sm:w-[80%] flex items-center justify-between">
                  <p className="mt-2 font-semibold text-xs">Delivery</p>
                  <p className="mt-2 font-semibold text-xs">40</p>
                </div>
                <div className="w-full sm:w-[80%] mt-1 flex items-center justify-between">
                  <p className="mt-2 font-semibold text-xs">Discount</p>
                  <p className="mt-2 font-semibold text-xs">00</p>
                </div>
                <div className="w-full sm:w-[80%] mt-1 flex items-center text-xl justify-between">
                  <p className="mt-2 font-semibold">Total</p>
                  <p className="mt-2 font-bold">Rs {subTotal}/-</p>
                </div>
              </div>

              <div className="w-full flex justify-center items-center mt-2 gap-2">
                <DrawerClose asChild>
                  <Button
                    className="w-1/2 bg-grey text-black font-bold hover:bg-grey.200"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    className="w-1/2 bg-black text-white"
                    onClick={() => Router.push("/shop/checkout")}
                  >
                    Checkout
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center font-bold mt-5">
            <h1 className="text-[60px]">😴</h1>
            <h1 className="text-lg">Your Cart Seems to be Empty</h1>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
