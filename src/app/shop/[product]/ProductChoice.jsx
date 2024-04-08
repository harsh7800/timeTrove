"use client";
import { addToCart } from "@/app/helpers/functions";
import { useCart, useStore } from "@/app/store/zustandStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import React, { useState } from "react";
import { useShallow } from "zustand/react/shallow";

const ProductChoice = ({
  siz,
  clr,
  variants,
  slug,
  availableQty,
  price,
  img,
  title,
  category,
}) => {
  const [size, setsize] = useState(siz);
  const [color, setColor] = useState(clr);
  const Router = useRouter();
  const updateSubTotal = useCart((state) => state.updateSubTotal);
  const cart = useCart((state) => state.cart);
  const uniqueItemId = `${slug}-${size}-${color}`;
  const user = useStore(useShallow((state) => state.user));


  const BuyNow = async () => {
    try {
      if (!cart[uniqueItemId] || cart[uniqueItemId].size != size) {
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
        {Object.keys(variants).length != 1 && (
          <p className="mr-3 font-semibold">Available Color</p>
        )}
        {Object.keys(variants).map((variantColor) => {
          // console.log(variants[color]);
          return (
            Object.keys(variants[variantColor]).includes(size) &&
            Object.keys(variants).length != 1 && (
              <button
                key={variantColor}
                onClick={() => {
                  {
                    Router.replace(
                      `${process.env.NEXT_PUBLIC_HOST}/shop/${variants[variantColor][size].slug}`
                    );
                    // console.log(Object.keys(variants).length);
                  }
                }}
                style={{ background: variantColor }}
                className={`border-[3px] ${
                  color == variantColor && "border-black border-[1.5px]"
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
                if (category == "footwear" || Object.keys(variants).length) {
                  Router.replace(
                    `${process.env.NEXT_PUBLIC_HOST}/shop/${variants[color][buttonSize].slug}`
                  );
                }
              }}
              className={`${
                size == buttonSize
                  ? "bg-purple text-white"
                  : "bg-grey text-black"
              } border rounded-lg hover:bg-[#f2e6ff]  hover:text-purple`}
            >
              {buttonSize}
            </Button>
          ))}
        </div>
      </div>

      {variants[color][size].availableQty ? (
        <div className="flex gap-3">
          <Button
            disabled={cart[uniqueItemId] && cart[uniqueItemId].size == size}
            onClick={async () => {
              await BuyNow();
              Router.refresh();
            }}
            className={`bg-black rounded-3xl text-white w-1/2 sm:w-2/5 ${
              cart[uniqueItemId] && cart[uniqueItemId].size === size
                ? "bg-[#f2e6ff] border text-purple hover:bg-[#f2e6ff] hover:text-purple"
                : ""
            }`}
          >
            {cart[uniqueItemId] && cart[uniqueItemId].size == size
              ? "Added To Cart"
              : "Add To Cart"}
          </Button>
          <Button
            onClick={async () => {
              if (user.token) {
                await BuyNow();
                Router.push("/shop/checkout");
              } else {
                Router.push("/authentication?redirect=checkout");
              }
              Router.refresh();
            }}
            className={`w-1/2 sm:w-2/5 text-white rounded-3xl bg-purple border-0 py-2 px-6 focus:outline-none hover:opacity-80 transition-all`}
          >
            {user.token ? "Checkout Now" : "Login to Checkout"}
          </Button>
        </div>
      ) : (
        <p className="text-2xl font-bold">☹️Out of stock</p>
      )}
    </div>
  );
};

export default ProductChoice;
