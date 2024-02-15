"use client";
import { FaHeart } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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

const ProductCard = ({ category, title, price, ImageURL }) => {
  const [isThere, setIsThere] = useState(false);
  return (
    <div className="border w-[230px] h-[400px] px-2 py-4 rounded-lg relative hover:shadow-shadow-2 transition-all cursor-pointer space-y-0.5">
      <div className="w-full border h-[250px] rounded-lg select-none">
        <img
          src={ImageURL}
          // src="http://assets.myntassets.com/v1/images/style/properties/828d3baf1dfd59dc8e4da0a0a2280231_images.jpg"
          alt="product"
          className="w-full object-cover h-full"
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
      <div className="flex justify-between items-center">
        <BuyNowDrawer />
        <Button>Go to Cart</Button>
      </div>
      {/* <div className="bg-purple absolute top-5 right-5 p-1 rounded-full"> */}
      <FaHeart
        onClick={() => setIsThere(!isThere)}
        size={25}
        className={`cursor-pointer ${
          isThere ? "text-[#e60073]" : "text-grey.200"
        } absolute top-5 right-5 `}
      />
      {/* </div> */}
    </div>
  );
};

export default ProductCard;

const BuyNowDrawer = ({ data }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
