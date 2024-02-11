"use client";
import { FaHeart } from "react-icons/fa";
import React, { useState } from "react";

const ProductCard = ({ category, title, price, img }) => {
  const [isThere, setIsThere] = useState(false);
  return (
    <div className="border max-w-[300px] h-fit px-2 py-4 rounded-lg relative hover:shadow-shadow-2 transition-all cursor-pointer space-y-0.5">
      <div className="w-full border h-[250px] rounded-lg">
        <img src={img} alt="product" className="w-full h-full" />
      </div>
      <h3 className="font-semibold opacity-60">{category}</h3>
      <h3 className="font-semibold ">{title}</h3>
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
      {/* <div className="bg-purple absolute top-5 right-5 p-1 rounded-full"> */}
      <FaHeart
        onClick={() => setIsThere(!isThere)}
        size={25}
        className={`cursor-pointer ${
          isThere ? "text-[#e60073]" : "text-white"
        } absolute top-5 right-5 `}
      />
      {/* </div> */}
    </div>
  );
};

export default ProductCard;
