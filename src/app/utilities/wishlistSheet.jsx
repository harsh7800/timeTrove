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
import { Heart, Loader2, ShoppingCart } from "lucide-react";

import React, { useEffect, useState } from "react";
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
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import Image from "next/image";
import { ProductVariants } from "../helpers/action";

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
                    <WishListProductCard
                      // dropDown
                      key={index}
                      slug={data}
                      img={wishlistCart[data].img}
                      productTitle={wishlistCart[data].name}
                      price={wishlistCart[data].price}
                      qty={wishlistCart[data].qty}
                      totalAmount={subTotal}
                      addToCart={() =>
                        addToWishlist(
                          wishlistCart,
                          data,
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
                          data,
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
                    Clear Wishlist
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    className="w-1/2 bg-black text-white"
                    onClick={() => {
                      addToCartFromWishlist(cart, wishlistCart, updateSubTotal);
                      clearCart();
                      router.refresh();
                      console.log(wishlistCart);
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

const WishListProductCard = ({
  setCart,
  addToCart,
  variant,
  removeFromCart,
  img,
  qty,
  dropDown,
  slug,
  productTitle,
  price,
}) => {
  const [productData, setProductData] = useState({});
  const [image, setImage] = useState(img);
  const [size, setsize] = useState("");
  const [colour, setColour] = useState("");
  const wishlistCart = wishlist(useShallow((state) => state.wishlistCart));
  const updateField = wishlist(useShallow((state) => state.updateField));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductVariants(productTitle);
        const firstColor = Object.keys(data[productTitle])[0];
        const firstSize = Object.keys(data[productTitle][firstColor])[0];
        setProductData(data);
        setColour(firstColor);
        setsize(firstSize);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const uniqueSizes = new Set();
  Object.keys(productData).forEach((title) => {
    Object.keys(productData[title]).forEach((color) => {
      Object.keys(productData[title][color]).forEach((buttonSize) => {
        uniqueSizes.add(buttonSize);
      });
    });
  });

  const updateSizeAndColor = (buttonSize, buttonColor, img) => {
    updateField({
      [slug]: {
        ...wishlistCart[slug], // Keep other fields unchanged
        size: buttonSize,
        variant: buttonColor,
        img: img,
      },
    });
  };

  return (
    <div
      className={`w-full flex items-center justify-start gap-4 animate-fade-left animate-once animate-duration-[800ms] animate-delay-[200] animate-ease-in-out animate-normal animate-fill-forwards`}
    >
      <Image
        className="w-[60px] sm:w-[90px] rounded-lg border"
        src={image}
        width={60}
        height={90}
        alt="product"
      />

      <div className="space-y-2">
        <h3 className="font-bold truncate w-full cursor-pointer">
          {productTitle}
        </h3>
        <div className={`font-semibold `}>
          <div className="flex gap-1 items-center">
            {Object.keys(productData).map((title) => {
              return Object.keys(productData[title]).map((color) => {
                return (
                  Object.keys(productData[title][color]).includes(size) && (
                    <button
                      key={color}
                      onClick={() => {
                        setColour(color);
                        setImage(productData[title][color][size]?.img);
                        updateSizeAndColor(size, color,image);
                      }}
                      style={{ background: color }}
                      className={`border-[3px] ${
                        colour === color && "border-black border-[3px]"
                      }  ml-1 rounded-full ${
                        colour === color ? "w-6 h-6" : "w-5 h-5"
                      } focus:outline-none`}
                    ></button>
                  )
                );
              });
            })}
          </div>

          <div className="flex gap-1 items-center">
            {Array.from(uniqueSizes).map((buttonSize) => (
              <Button
                key={buttonSize}
                onClick={() => {
                  setsize(buttonSize);
                  updateSizeAndColor(buttonSize, colour,image);
                }}
                className={`${
                  size == buttonSize
                    ? "bg-purple text-white"
                    : "bg-grey text-black"
                } border mt-2 rounded-lg w-7 h-7`}
              >
                {buttonSize}
              </Button>
            ))}
          </div>
        </div>
        <p className="font-bold flex items-center gap-2 text-sm sm:text-md">
          Rs {productData?.product?.price || price}{" "}
          <span className=" flex items-center gap-2 text-[#999999] ml-1 font-medium text-sm">
            Qty{" "}
            <span className="flex items-center gap-1 sm:gap-3 text-purple font-bold select-none">
              <FaMinus
                onClick={() => {
                  if (qty <= 1) {
                    router.refresh();
                  }
                  removeFromCart();
                }}
                size={20}
                className="cursor-pointer p-1 bg-black rounded-full text-white"
              />
              {qty}
              <FaPlus
                onClick={addToCart}
                size={20}
                className="cursor-pointer p-1 bg-black rounded-full text-white"
              />
            </span>{" "}
          </span>
        </p>
      </div>
    </div>
  );
};
