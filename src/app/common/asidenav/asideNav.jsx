"use client";
import { Loader2, LogOut, TrendingUp, Zap } from "lucide-react";
import { PiHoodie, PiSneaker } from "react-icons/pi";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useStore } from "../../store/zustandStore";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";

export const AsideNav = ({ mobile }) => {
  const router = useRouter();
  const path = usePathname();
  const logout = useStore((state) => state.logout);

  const handleRedirect = (path) => {
    router.push(`/shop/${path}`);
  };

  const [data, setData] = useState([]);
  const email = useStore(useShallow((state) => state.user.email));
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/account/${email}`, {
      cache: "reload",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data.orders);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [email]);

  return (
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
        <h1 className="font-mono capitalize font-semibold text-xl sm:text-xl xl:text-2xl  ">
          TimeTrove
        </h1>
        <div className="absolute left-[10%] sm:left-[20%] bg-purple rounded-xl w-[15%] h-[4px]"></div>
      </div>

      <div className="capitalize space-y-4 text-sm sm:text-md font-semibold w-[80%]">
        {/* <h3
          className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
            path.includes("popular-products")
              ? "bg-purple text-white"
              : "hover:bg-purple hover:text-white"
          } transition-colors cursor-pointer`}
          onClick={() => handleRedirect("popular-products")}
        >
          <TrendingUp /> popular products
        </h3> */}
        <h3
          className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
            path.includes("winterwears")
              ? "bg-purple text-white"
              : "hover:bg-purple hover:text-white"
          } transition-colors cursor-pointer`}
          onClick={() => handleRedirect("winterwears")}
        >
          <PiHoodie size={25} /> Wintewears
        </h3>

        <h3
          className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
            path.includes("footwears")
              ? "bg-purple text-white"
              : "hover:bg-purple hover:text-white"
          } transition-colors cursor-pointer`}
          onClick={() => handleRedirect("footwears")}
        >
          <PiSneaker size={25} /> Footwears
        </h3>

        <h3
          className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
            path.includes("anime")
              ? "bg-purple text-white"
              : "hover:bg-purple hover:text-white"
          } transition-colors cursor-pointer`}
          onClick={() => handleRedirect("anime")}
        >
          <Image
            width={25}
            height={25}
            src="https://img.icons8.com/ios/50/naruto.png"
            alt="naruto"
          />
          anime
        </h3>

        <h3
          className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
            path.includes("new-arrivals")
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
          <h4 className="text-sm sm:text-md font-semibold opacity-80 w-full text-left">
            Total orders{" "}
            <span className="font-bold pop">{data.length || 0}</span>
          </h4>
          {data
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Replace 'createdAt' with the actual property representing the order creation time
            .slice(0, 3)
            .filter((order) => Object.keys(order.products).length === 1)
            .map((order, i) => {
              return (
                // <Suspense
                //   key={i}
                //   fallback={<Loader2 size={20} className="animate-spin" />}
                // >
                <HoverCardOrder key={i} order={order} />
                // </Suspense>
              );
            })}
          {data.length == 0 && (
            <p className="font-semibold text-[14px]">No Order Recorded</p>
          )}
          {data.length > 3 && (
            <p
              className="text-sm font-semibold cursor-pointer"
              onClick={() => router.push("/shop/account/orders")}
            >
              View All
            </p>
          )}
        </div>
      )}

      <div className="w-[80%]">
        <Button
          onClick={() => {
            router.push("/authentication");
            logout();
          }}
          className="w-30 bg-white text-black text-md hover:bg-white"
        >
          <LogOut /> &nbsp;&nbsp; Log Out
        </Button>
      </div>
    </aside>
  );
};

export function HoverCardOrder({ order }) {
  let orderSlug = Object.keys(order.products);
  const router = useRouter();
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex gap-2 text-sm sm:text-md items-center w-[90%]">
          {/* <div className="w-7 h-7 border-black border-2 rounded-lg"></div> */}
          <Image
            className="rounded-lg border"
            width={50}
            height={50}
            src={order.products[orderSlug]?.img}
            alt={order.products[orderSlug]?.name}
          />
          <p className="font-semibold truncate ">
            {order.products[orderSlug]?.name}
          </p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        onClick={() => router.push(`/shop/account/${order.orderId}`)}
        className=" flex items-center gap-3 bg-white w-fit cursor-pointer"
      >
        <Image
          className="rounded-lg"
          width={100}
          height={100}
          src={order.products[orderSlug]?.img}
          alt={order.products[orderSlug]?.name}
        />
        <div className="items-center w-[90%] font-poppins">
          <p className="font-semibold truncate ">
            {order.products[orderSlug]?.name}
          </p>
          <p className="font-semibold truncate ">
            Rs {order.products[orderSlug]?.price}/-
          </p>
          <p className="font-semibold truncate ">
            Size: {order.products[orderSlug]?.size}
          </p>
          <div className="flex items-center gap-2 font-semibold">
            <p>Color :</p>
            <div
              className={`w-5 h-5 rounded-full border-2`}
              style={{
                background:
                  order?.products[orderSlug]?.color ||
                  order?.products[orderSlug]?.variant,
              }}
            ></div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
