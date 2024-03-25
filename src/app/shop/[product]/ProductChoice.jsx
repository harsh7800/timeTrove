"use client";
import { addToCart } from "@/app/helpers/functions";
import { useCart } from "@/app/store/zustandStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import React, { useState } from "react";

const ProductChoice = ({
  siz,
  clr,
  variants,
  slug,
  availableQty,
  price,
  img,
  title,
}) => {
  const [size, setsize] = useState(siz);
  const [color, setColor] = useState(clr);
  const Router = useRouter();
  const updateSubTotal = useCart((state) => state.updateSubTotal);
  const cart = useCart((state) => state.cart);
  const BuyNow = async () => {
    try {
      if (!cart[slug]) {
        await addToCart(
          cart,
          slug,
          1,
          price,
          title,
          size,
          color,
          img,
          updateSubTotal
        );
      }
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    }
  };

  return (
    <div>
      <div className="mt-6 pb-5 border-gray-100 mb-5 space-y-2">
        <p className="mr-3 font-semibold">Available Color</p>
        {Object.keys(variants).map((variantColor) => {
          // console.log(variants[color]);
          return (
            Object.keys(variants[variantColor]).includes(size) && (
              <button
                key={variantColor}
                onClick={() => {
                  {
                    setColor(variantColor);
                    Router.replace(
                      `${process.env.NEXT_PUBLIC_HOST}/shop/${variants[variantColor][size].slug}`
                    );
                  }
                }}
                style={{ background: variantColor }}
                className={`border-[3px] ${
                  color == variantColor && "border-black border-[3px]"
                }  ml-1 rounded-full ${
                  color == variantColor ? "w-7 h-7" : "w-6 h-6"
                } focus:outline-none`}
              ></button>
            )
          );
        })}

        <p className="">Size</p>
        <div className="flex gap-3">
          {Object.keys(variants[color]).map((buttonSize) => (
            <Button
              key={buttonSize}
              onClick={() => {
                setsize(buttonSize);
              }}
              className={`${
                size == buttonSize
                  ? "bg-purple text-white"
                  : "bg-grey text-black"
              } border rounded-lg`}
            >
              {buttonSize}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={async () => {
            await BuyNow();
            Router.refresh();
          }}
          className={`bg-black rounded-3xl text-white w-1/2 sm:w-2/5 ${
            cart[slug] &&
            "bg-[#f2e6ff] border text-purple hover:bg-[#f2e6ff] hover:text-purple"
          }`}
        >
          {cart[slug] ? "Added To Cart" : "Add To Cart"}
        </Button>
        <Button
          onClick={async () => {
            await BuyNow();
            Router.refresh();
            Router.push("/shop/checkout");
          }}
          disabled={availableQty == 0}
          className={`w-1/2 sm:w-2/5 text-white rounded-3xl bg-purple border-0 py-2 px-6 focus:outline-none hover:opacity-80 transition-all ${
            availableQty == 0 && "opacity-70 cursor-not-allowed"
          }`}
        >
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default ProductChoice;
