"use client";
import { LogOut, TrendingUp, Zap } from "lucide-react";
import { PiHoodie, PiSneaker } from "react-icons/pi";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import AsideNavLoader from "./AsideNavLoader";
import { useStore } from "../store/zustandStore";

export const AsideNav = ({ mobile }) => {
  const router = useRouter();
  const path = usePathname();
  const logout = useStore((state) => state.logout);

  const handleRedirect = (path) => {
    router.push(`/shop/${path}`);
  };
  return (
    <Suspense fallback={<AsideNavLoader />}>
      <aside
        className={`flex ${mobile ? "border-none" : "border-2"} ${
          mobile ? "min-w-[250px]" : "min-w-[300px]"
        } flex-col ${mobile ? "items-start" : "items-center"} max-w-[400px] ${
          mobile ? "justify-start gap-[100px]" : "justify-between"
        } h-full py-5`}
      >
        <div
          className=" w-[80%] relative cursor-pointer"
          onClick={() => router.push("/")}
        >
          <h1 className="font-mono capitalize font-semibold text-xl sm:text-3xl ">
            TimeTrove
          </h1>
          <div className="absolute left-[10%] sm:left-[20%] bg-purple rounded-xl w-[15%] h-[4px]"></div>
        </div>

        <div className="capitalize space-y-4 text-sm sm:text-lg font-semibold w-[80%]">
          <h3
            className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
              path == "/shop/popular-products"
                ? "bg-purple text-white"
                : "hover:bg-purple hover:text-white"
            } transition-colors cursor-pointer`}
            onClick={() => handleRedirect("popular-products")}
          >
            <TrendingUp /> popular products
          </h3>

          <h3
            className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
              path == "/shop/winterwears"
                ? "bg-purple text-white"
                : "hover:bg-purple hover:text-white"
            } transition-colors cursor-pointer`}
            onClick={() => handleRedirect("winterwears")}
          >
            <PiHoodie size={25} /> Wintewears
          </h3>

          <h3
            className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
              path == "/shop/footwears"
                ? "bg-purple text-white"
                : "hover:bg-purple hover:text-white"
            } transition-colors cursor-pointer`}
            onClick={() => handleRedirect("footwears")}
          >
            <PiSneaker size={25} /> Footwears
          </h3>

          <h3
            className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
              path == "/shop/anime"
                ? "bg-purple text-white"
                : "hover:bg-purple hover:text-white"
            } transition-colors cursor-pointer`}
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
            className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
              path == "/shop/new-arrivals"
                ? "bg-purple text-white"
                : "hover:bg-purple hover:text-white"
            } transition-colors cursor-pointer`}
            onClick={() => handleRedirect("new-arrivals")}
          >
            <Zap /> new arrivals
          </h3>
        </div>

        {!mobile && (
          <div className="w-[80%] flex flex-col items-center justify-center border-t space-y-3 pt-5">
            <h4 className="text-sm sm:text-lg font-semibold opacity-80 w-full text-left">
              Total orders <span className="font-bold pop">14</span>
            </h4>
            <HoverCardOrder order="Nike Shoes" />
          </div>
        )}

        <div className="w-[80%]">
          <Button
            onClick={() => {
              router.push("/authentication");
              logout();
            }}
            className="w-30 bg-white text-black text-lg hover:bg-white"
          >
            <LogOut /> &nbsp;&nbsp; Log Out
          </Button>
        </div>
      </aside>
    </Suspense>
  );
};

export function HoverCardOrder({ order }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex gap-2 text-sm sm:text-lg items-center w-[90%]">
          <div className="w-7 h-7 border-black border-2 rounded-lg"></div>
          <p className="font-semibold truncate ">Nike Shoes</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-white w-80">
        <div className="flex gap-2 items-center w-[90%]">
          <div className="w-7 h-7 border-black border-2 rounded-lg"></div>
          <p className="font-semibold truncate ">Nike Shoes</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
