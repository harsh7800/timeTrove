"use client";
import { LogOut, TrendingUp, Zap } from "lucide-react";
import { PiHoodie, PiSneaker } from "react-icons/pi";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const AsideNav = () => {
  const router = useRouter();
  const handleRedirect = (path) => {
    router.push(`/${path}`);
  };
  return (
    <aside className="border-r border-2 min-w-[350px] flex flex-col items-center max-w-[400px] justify-around">
      <div className="w-[80%] relative">
        <h1 className="font-mono capitalize font-semibold text-3xl ">
          TimeTrove
        </h1>
        <div className="absolute left-[20%] bg-[#bf00ff] rounded-xl w-[15%] h-[4px]"></div>
      </div>

      <div className="capitalize space-y-4 text-lg font-semibold w-[80%]">
        <h3
          className="py-3 px-4 rounded-2xl flex items-center gap-3 hover:bg-[#bf00ff] hover:text-white transition-colors cursor-pointer"
          onClick={() => handleRedirect("popular-products")}
        >
          <TrendingUp /> popular products
        </h3>
        <h3
          className="py-3 px-4 rounded-2xl flex items-center gap-3 hover:bg-[#bf00ff] hover:text-white transition-colors cursor-pointer"
          onClick={() => handleRedirect("winterwears")}
        >
          <PiHoodie size={25} /> Wintewears
        </h3>
        <h3
          className="py-3 px-4 rounded-2xl flex items-center gap-3 hover:bg-[#bf00ff] hover:text-white transition-colors cursor-pointer"
          onClick={() => handleRedirect("footwears")}
        >
          <PiSneaker size={25} /> Footwears
        </h3>
        <h3
          className="py-3 px-4 rounded-2xl flex items-center gap-3 hover:bg-[#bf00ff] hover:text-white transition-colors cursor-pointer"
          onClick={() => handleRedirect("anime")}
        >
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios/50/naruto.png"
            alt="naruto"
          />
          anime
        </h3>
        <h3
          className="py-3 px-4 rounded-2xl flex items-center gap-3 hover:bg-[#bf00ff] hover:text-white transition-colors cursor-pointer"
          onClick={() => handleRedirect("new-arrivals")}
        >
          <Zap /> new arrivals
        </h3>
      </div>

      <div className="w-[80%] flex flex-col items-center justify-center border-t space-y-3 pt-5">
        <h4 className="text-lg font-semibold opacity-80 w-full text-left">
          Total orders <span className="font-bold pop">14</span>
        </h4>
        <div className="flex gap-2 items-center w-[90%]">
          <div className="w-7 h-7 border-black border-2 rounded-lg"></div>
          <p className="font-semibold truncate ">Nike Shoes</p>
        </div>
        <div className="flex gap-2 items-center w-[90%]">
          <div className="w-7 h-7 border-black border-2 rounded-lg"></div>
          <p className="font-semibold truncate ">Nike Shoes</p>
        </div>
        <div className="flex gap-2 items-center w-[90%]">
          <div className="w-7 h-7 border-black border-2 rounded-lg"></div>
          <p className="font-semibold truncate ">Nike Shoes</p>
        </div>
      </div>

      <div className="w-[80%]">
        <Button className="w-30 bg-white text-black text-lg hover:bg-white">
          <LogOut /> &nbsp;&nbsp; Log Out
        </Button>
      </div>
    </aside>
  );
};
