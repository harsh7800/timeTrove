"use client";
import { FaHeart } from "react-icons/fa";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LiaCartArrowDownSolid, LiaCartPlusSolid } from "react-icons/lia";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useCart, useQuickBuy, wishlist } from "../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next-nprogress-bar";
const ProductCard = ({
  category,
  title,
  price,
  ImageURL,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  QuickBuy,
  size,
  color,
  availableQty,
}) => {
  const updateSubTotal = useCart(useShallow((state) => state.updateSubTotal));
  const router = useRouter();
  const wishlistCart = wishlist(useShallow((state) => state.wishlistCart));
  return (
    <div className="border w-full sm:w-[250px] h-[400px] px-2 py-4 rounded-lg relative hover:shadow-shadow-2 transition-all cursor-pointer space-y-0.5">
      <div className="w-full border h-[250px] rounded-lg select-none">
        <Image
          src={ImageURL}
          width={250}
          height={250}
          className="w-full object-cover h-full"
          alt="Product"
        />
      </div>
      <h3 className="font-semibold opacity-60">{category}</h3>
      <h3 className="font-semibold truncate w-5/6">{title}</h3>
      {/* <div className="flex items-center gap-2">
        <h3 className="font-semibold ">XS</h3>
        <h3 className="font-semibold ">S</h3>
        <h3 className="font-semibold ">M</h3>
        <h3 className="font-semibold ">L</h3>
        <h3 className="font-semibold ">Xl</h3>
        <h3 className="font-semibold ">XXl</h3>
      </div> */}
      {/* <div className="flex items-center gap-2">
        <div className="w-5 bg-black h-5 rounded-full border-grey.200 border-[3px]"></div>
        <div className="w-5 bg-grey h-5 rounded-full border-grey.200 border-[3px]"></div>
        <div className="w-5 bg-[#e60000] h-5 rounded-full border-grey.200 border-[3px]"></div>
        <div className="w-5 bg-[#29a329] h-5 rounded-full border-grey.200 border-[3px]"></div>
        <div className="w-5 bg-[#1a1aff] h-5 rounded-full border-grey.200 border-[3px]"></div>
        <div className="w-5 bg-[#fff] h-5 rounded-full border-grey.200 border-[3px]"></div>
      </div> */}
      <h3 className="font-semibold">Rs {price}</h3>
      <div className=" w-full mt-5 flex gap-2 justify-between items-center">
        <BuyNowDrawer
          productTitle={title}
          name={title}
          size={size}
          color={color}
          qty={1}
          price={price}
          img={ImageURL}
          QuickBuy={QuickBuy}
        />
        <Button
          className={`hidden sm:block w-1/2 ${
            availableQty == 0 && "opacity-70 cursor-not-allowed"
          }`}
          onClick={availableQty != 0 ? addToCart : undefined}
        >
          {availableQty == 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <LiaCartPlusSolid
          onClick={addToCart}
          className="block sm:hidden w-1/2 rounded-lg h-[35px] bg-black text-white"
          size={40}
        />
      </div>
      {/* <div className="bg-purple absolute top-5 right-5 p-1 rounded-full"> */}
      <FaHeart
        onClick={() => {
          wishlistCart[title] ? removeFromWishlist() : addToWishlist();
          router.refresh();
        }}
        size={25}
        className={`cursor-pointer ${
          wishlistCart[title] ? "text-[#e60073]" : "text-grey.200"
        } absolute top-5 right-5 `}
      />
      {/* </div> */}
    </div>
  );
};

export default ProductCard;

const BuyNowDrawer = ({
  QuickBuy,
  productTitle,
  qty,
  price,
  name,
  size,
  color,
  img,
  addToCart,
  removeFromCart,
}) => {
  const QuickBuyCart = useQuickBuy(useShallow((state) => state.QuickBuyCart));
  const subTotal = useQuickBuy(useShallow((state) => state.subTotal));
  const clearCart = useQuickBuy(useShallow((state) => state.clearCart));
  const router = useRouter();

  return (
    <Drawer>
      <DrawerTrigger asChild className="hidden sm:block">
        <Button
          className=" bg-black w-1/2"
          onClick={async () => {
            QuickBuy();
            router.refresh();
          }}
        >
          Quick Buy
        </Button>
      </DrawerTrigger>
      <DrawerTrigger
        asChild
        className="block sm:hidden bg-grey rounded-lg w-1/2 h-[35px]"
      >
        <LiaCartArrowDownSolid />
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left pl-[15px] sm:pl-[50px]">
          <DrawerTitle className="font-bold text-2xl">
            Quick Buy Cart
          </DrawerTitle>
          <DrawerDescription className="font-semibold opacity-60">
            This is a quick buy option where you can buy the product in a snap
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center items-start gap-5 ">
          <div className="w-[90%] sm:w-[500px] my-5 shadow-md  p-4 rounded-lg space-y-6">
            <h3 className="font-bold w-full text-start">Your Order</h3>
            {Object.keys(QuickBuyCart).map((data, index) => {
              return (
                <QuickBuyProductCard
                  key={index}
                  ImageUrl={QuickBuyCart[data].img}
                  productTitle={QuickBuyCart[data].name}
                  price={QuickBuyCart[data].price}
                  qty={QuickBuyCart[data].qty}
                  totalAmount={subTotal}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              );
            })}
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
                <p className="mt-2 font-bold">{subTotal}</p>
              </div>
            </div>
            <div className="block lg:hidden border-1 shadow-lg rounded-lg px-7 py-3 w-[full] space-y-4">
              <h3 className="font-bold">Shipping Address</h3>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one" className="leading-5">
                    431804, Sarafa Line, Sonar Gully, Kinwat, Nanded, Maharastra
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="w-full flex justify-center items-center gap-2">
              <DrawerClose asChild>
                <Button
                  className="w-1/2 bg-grey text-black font-bold hover:bg-grey.200"
                  onClick={clearCart}
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button className="w-1/2">Pay {subTotal}/-</Button>
            </div>
          </div>

          <div className="hidden mt-2 lg:block border-2 rounded-lg px-7 py-3 w-[40%] max-w-[500px] space-y-4">
            <h3 className="font-bold">Shipping Address</h3>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one" className="leading-5">
                  431804, Sarafa Line, Sonar Gully, Kinwat, <br /> Nanded,
                  Maharastra
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one" className="leading-5">
                  431804, Sarafa Line, Sonar Gully, Kinwat, <br /> Nanded,
                  Maharastra
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const QuickBuyProductCard = ({
  addToCart,
  removeFromCart,
  ImageUrl,
  productTitle,
  size,
  color,
  qty,
  price,
}) => {
  const cart = useCart(useShallow((state) => state.cart));
  const updateSubTotal = useCart((state) => state.updateSubTotal);
  return (
    <div className="w-full flex items-center justify-start gap-4">
      <img
        className="w-[60px] sm:w-[90px] rounded-lg border"
        src={ImageUrl}
        alt="product"
      />
      <div>
        <h3 className="font-bold truncate w-3/4">{productTitle}</h3>
        <p className="font-semibold ">
          <span className="text-[#999999] text-sm">
            Size <span className="font-semibold text-black text-sm">Xl</span>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-[#999999] text-sm">
            Color <span className="font-semibold text-black text-sm">Blue</span>
          </span>
        </p>
        <p className="font-bold flex items-center gap-2 text-sm sm:text-md">
          Rs {price}{" "}
          <span className=" flex items-center gap-2 text-[#999999] ml-1 font-medium text-sm">
            Qty{" "}
            <span className="flex items-center gap-1 sm:gap-3 text-black font-bold">
              <FaMinus
                onClick={removeFromCart}
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
