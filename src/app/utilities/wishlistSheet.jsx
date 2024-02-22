import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, ShoppingCart } from "lucide-react";

import React from "react";
import { useCart, wishlist } from "../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import { DrawerClose } from "@/components/ui/drawer";
import { QuickBuyProductCard } from "./productCard";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  addToCartFromWishlist,
} from "../helpers/functions";
import { useRouter } from "next-nprogress-bar";

export default function WishlistSheet() {
  const wishlistCart = wishlist(useShallow((state) => state.wishlistCart));
  const cart = useCart(useShallow((state) => state.cart));
  const wishlistSubTotal = wishlist(
    useShallow((state) => state.wishlistSubTotal)
  );
  const updateSubTotal = useCart(useShallow((state) => state.updateSubTotal));
  const subTotal = wishlist(useShallow((state) => state.subTotal));
  const clearCart = wishlist(useShallow((state) => state.clearCart));
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <Heart />
          {Object.keys(wishlistCart).length != 0 && (
            <p className="absolute top-[-45%] bg-purple text-xs px-2 text-white p-1 rounded-full right-[-40%] font-bold">
              {Object.keys(wishlistCart).length || 0}
            </p>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle className="font-bold">Welcome to the Wishlist</SheetTitle>
        </SheetHeader>
        {Object.keys(wishlistCart).length > 0 ? (
          <div className="flex justify-center items-start gap-5 ">
            <div className="w-full sm:w-[500px] my-5 shadow-md  p-4 rounded-lg space-y-6">
              <h3 className="font-bold w-full text-start">
                Your Wishlisted Items
              </h3>
              <div className="space-y-6 max-h-[70dvh] overflow-x-visible overflow-y-scroll bg-white scroll mt-2">
                {Object.keys(wishlistCart).map((data, index) => {
                  return (
                    <QuickBuyProductCard
                      key={index}
                      img={wishlistCart[data].img}
                      productTitle={wishlistCart[data].name}
                      price={wishlistCart[data].price}
                      qty={wishlistCart[data].qty}
                      totalAmount={subTotal}
                      addToCart={() =>
                        addToWishlist(
                          wishlistCart,
                          wishlistCart[data].name,
                          1,
                          wishlistCart[data].price,
                          wishlistCart[data].title,
                          wishlistCart[data].size,
                          wishlistCart[data].color,
                          wishlistCart[data].img,
                          wishlistSubTotal
                        )
                      }
                      removeFromCart={() =>
                        removeFromWishlist(
                          wishlistCart,
                          wishlistCart[data].name,
                          1,
                          wishlistSubTotal
                        )
                      }
                    />
                  );
                })}
              </div>
              <div className="w-full flex justify-center items-center gap-2 mt-2">
                <DrawerClose asChild>
                  <Button
                    className="w-1/2 bg-grey text-black font-bold hover:bg-grey.200"
                    onClick={clearCart}
                  >
                    Remove All
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    className="w-1/2"
                    onClick={() => {
                      addToCartFromWishlist(cart, wishlistCart, updateSubTotal);
                      clearCart();
                      router.refresh();
                    }}
                  >
                    Move to Cart
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center font-bold mt-5">
            <h1 className="text-[60px]">💔</h1>
            <h1 className="text-lg">Wishlist is Empty</h1>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
