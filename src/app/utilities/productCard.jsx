"use client";
import { FaHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
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
import { BsCartCheckFill } from "react-icons/bs";
import { CheckCheck } from "lucide-react";
const ProductCard = ({
  index,
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
  const router = useRouter();
  const wishlistCart = wishlist(useShallow((state) => state.wishlistCart));
  const cart = useCart(useShallow((state) => state.cart));
  return (
    <div
      className={`border w-full sm:w-[250px] h-[400px] px-2 py-4 rounded-lg relative hover:shadow-shadow-2 transition-all cursor-pointer space-y-0.5  animate-fade-down animate-once animate-duration-[800ms] animate-delay-[${
        index * 50
      }] animate-ease-in-out animate-normal animate-fill-forwards`}
    >
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
          } ${cart[title] && "bg-white border text-black hover:bg-white"}`}
          onClick={() => {
            if (availableQty !== 0) {
              router.refresh();
              addToCart();
            }
          }}
        >
          {cart[title]
            ? "Added to Cart"
            : availableQty == 0
            ? "Out of Stock"
            : "Add to Cart"}
        </Button>
        {cart[title] ? (
          <CheckCheck
            size={40}
            className={`block sm:hidden w-1/2 text-[20px] rounded-lg h-[35px] bg-black   ${
              cart[title] && "bg-white border text-[#33cc33] hover:bg-white"
            }`}
          />
        ) : (
          <LiaCartPlusSolid
            onClick={() => {
              if (availableQty !== 0) {
                router.refresh();
                addToCart();
              }
            }}
            className="block sm:hidden w-1/2 rounded-lg h-[35px] bg-black text-white"
            size={40}
          />
        )}
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

const BuyNowDrawer = ({ price, name, size, color, img }) => {
  const router = useRouter();
  const [cart, setCart] = useState({});
  return (
    <Drawer>
      <DrawerTrigger asChild className="hidden sm:block">
        <Button
          className=" bg-black w-1/2"
          onClick={() => {
            router.refresh();
            setCart({ qty: 1, price, name, size, color, img });
          }}
        >
          Quick Buy
        </Button>
      </DrawerTrigger>
      <DrawerTrigger
        asChild
        className="block sm:hidden bg-grey rounded-lg w-1/2 h-[35px]"
      >
        <LiaCartArrowDownSolid
          onClick={() => {
            router.refresh();
            setCart({ qty: 1, price, name, size, color, img });
          }}
        />
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
            {cart.qty != 0 && (
              <QuickBuyProductCard
                cart={cart}
                img={cart.img}
                price={cart.price}
                qty={cart.qty}
                productTitle={cart.name}
                addToCart={() =>
                  setCart((prevCart) => ({
                    ...prevCart,
                    qty: prevCart.qty + 1,
                  }))
                }
                removeFromCart={() =>
                  setCart((prevCart) => ({
                    ...prevCart,
                    qty: prevCart.qty - 1,
                  }))
                }
              />
            )}
            {cart.qty != 0 && cart.qty != 0 && (
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
                  <p className="mt-2 font-bold">
                    {cart.qty != 0 ? cart.price : 0}
                  </p>
                </div>
              </div>
            )}
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
                  onClick={() => setCart({})}
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button className="w-1/2">
                Pay {cart.qty != 0 ? cart.price : 0}/-
              </Button>
            </div>
          </div>

          <div className="hidden mt-2 lg:block border-2 rounded-lg px-7 py-3 w-[40%] max-w-[500px] space-y-4">
            <h3 className="font-bold">Shipping Address</h3>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                  className="accent-purple text-purple"
                />
                <Label htmlFor="option-one" className="leading-5">
                  431804, Sarafa Line, Sonar Gully, Kinwat, <br /> Nanded,
                  Maharastra
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                  className="accent-purple text-purple"
                />
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
  img,
  productTitle,
  qty,
  price,
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-start gap-4">
      <img
        className="w-[60px] sm:w-[90px] rounded-lg border"
        src={img}
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
            <span className="flex items-center gap-1 sm:gap-3 text-purple font-bold select-none">
              <FaMinus
                onClick={() => {
                  if (qty <= 1) {
                    console.log(1);
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
