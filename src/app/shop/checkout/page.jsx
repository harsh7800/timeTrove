"use client";
import { Checkout, addToCart, removeFromCart } from "@/app/helpers/functions";
import { useCart, useStore } from "@/app/store/zustandStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useShallow } from "zustand/react/shallow";
const Page = () => {
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const cart = useCart(useShallow((state) => state.cart));
  const subTotal = useCart(useShallow((state) => state.subTotal));
  const email = useStore(useShallow((state) => state.user.email));
  const router = useRouter();
  const { toast } = useToast();
  return (
    <div className="w-full  px-5">
      <div>
        <h1 className="font-bold text-2xl"> Checkout</h1>
        <p className="text-[#b3b3b3] text-md font-semibold">
          Please re-check the information before proceeding to pay
        </p>
      </div>
      <div className="w-full flex md:flex-row flex-col-reverse item-center gap-4">
        <div className="w-full md:w-1/2 p-4 rounded-lg mt-5">
          {Object.keys(cart).length > 0 ? (
            <h3 className="font-bold w-full text-start">Your Order</h3>
          ) : (
            <h3 className="font-bold w-full text-[20px] text-start">
              Cart is empty
            </h3>
          )}
          <Cart />
          {Object.keys(cart).length > 0 && (
            <div className="w-full text-md mt-3">
              <div className="w-full flex items-center justify-between ">
                <p className="mt-2 font-semibold">Delivery</p>
                <p className="mt-2 font-semibold">40</p>
              </div>
              <div className="w-full mt-1 flex items-center justify-between">
                <p className="mt-2 font-semibold">Discount</p>
                <p className="mt-2 font-semibold">00</p>
              </div>
              <div className="w-full mt-1 flex items-center text-xl justify-between">
                <p className="mt-2 font-semibold">Total</p>
                <p className="mt-2 font-bold">Rs {subTotal}</p>
              </div>
              <div className="flex justify-center mt-3">
                <Button
                  className=" bg-black text-white"
                  disabled={Object.keys(deliveryAddress).length == 0}
                  onClick={() => {
                    Checkout(
                      subTotal,
                      email,
                      cart,
                      deliveryAddress,
                      router,
                      setLoading,
                      toast
                    );
                  }}
                >
                  {loading && (
                    <Loader2 className="animate-spin mr-1" size={20} />
                  )}
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
        {Object.keys(cart).length > 0 && (
          <SelectAddress setdeliveryAddress={setDeliveryAddress} />
        )}
      </div>
    </div>
  );
};

export default Page;

const Cart = () => {
  const cart = useCart(useShallow((state) => state.cart));
  const updateSubTotal = useCart(useShallow((state) => state.updateSubTotal));
  const router = useRouter();
  return (
    <div className="space-y-3 min-h-fit max-h-[fit] overflow-y-scroll bg-white scroll mt-2">
      {Object.keys(cart).map((data, index) => {
        return (
          <div
            key={index}
            className={`w-full flex justify-between items-center`}
          >
            <div className="items-center flex justify-start gap-4 ">
              <Suspense
                fallback={
                  <Skeleton className="bg-grey.200 w-[60px] h-[70px]" />
                }
              >
                <Image
                  className="w-[60px] sm:w-[90px] rounded-lg border"
                  src={cart[data].img}
                  width={60}
                  height={90}
                  alt="product"
                />
              </Suspense>
              <div>
                <h3 className="font-bold w-full">{cart[data].name}</h3>
                <p className="font-semibold ">
                  <span className="text-[#999999] text-sm">
                    Size{" "}
                    <span className="font-semibold text-black text-sm">Xl</span>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-[#999999] text-sm">
                    Color{" "}
                    <span className="font-semibold text-black text-sm">
                      Blue
                    </span>
                  </span>
                </p>
                <p className="font-bold flex items-center gap-2 text-sm sm:text-md">
                  Rs {cart[data].price}{" "}
                </p>
              </div>
            </div>
            <p>
              {" "}
              <span className=" flex items-center gap-2 text-[#999999] ml-1 font-medium text-sm">
                {" "}
                <span className="flex items-center gap-1 sm:gap-3 text-purple font-bold select-none">
                  <FaMinus
                    onClick={() => {
                      if (cart[data].qty <= 1) {
                        router.refresh();
                      }
                      if (cart[data].qty > 1) {
                        removeFromCart(cart, data, 1, updateSubTotal);
                      }
                    }}
                    size={20}
                    className={`cursor-pointer ${
                      cart[data].qty == 1 && "opacity-70 cursor-not-allowed"
                    } p-1 bg-black rounded-full text-white`}
                  />
                  {cart[data].qty}
                  <FaPlus
                    onClick={() =>
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
                    size={20}
                    className="cursor-pointer p-1 bg-black rounded-full text-white"
                  />
                </span>{" "}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

const SelectAddress = ({ setdeliveryAddress }) => {
  const address = useStore((state) => state.user.billingAddress);

  return (
    <div className="mt-2 border-none md:border-l-2 md:px-7 py-3 md:w-[40%] w-[full] md:max-w-[500px] space-y-4">
      {address?.length != 0 ? (
        <div className="">
          <h3 className="font-bold">Shipping Address</h3>
          <p className="font-semibold text-sm text-[#b3b3b3]">
            Select a Address To Checkout
          </p>
        </div>
      ) : (
        <div className="w-full space-y-2 flex flex-col items-center">
          <h3 className="font-bold">No Address Found</h3>
          <Button
            className="font-bold bg-black text-white"
            onClick={() => router.push(`/shop/account/billing/${email}`)}
          >
            Add Address
          </Button>
        </div>
      )}
      <RadioGroup
        onValueChange={(value) => {
          setdeliveryAddress(value);
        }}
      >
        {address &&
          address?.map((addr, i) => {
            return (
              <div className="flex items-center space-x-2 space-y-2" key={i}>
                <RadioGroupItem
                  value={addr}
                  id={addr._id}
                  className="accent-purple text-purple"
                />
                <Label htmlFor={addr._id} className="leading-5">
                  {addr.pincode}, {addr.addressName}, {addr.landmark}, &nbsp;
                  {addr.city}, <br /> {addr.state}
                </Label>
              </div>
            );
          })}
      </RadioGroup>
    </div>
  );
};
