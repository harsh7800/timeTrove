"use client";
import { Home, Loader2, LogOut, TrendingUp, Zap } from "lucide-react";
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
import { fetchUserOrders } from "@/app/helpers/action";
import { Skeleton } from "@/components/ui/skeleton";

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
    const fetchOrders = async () => {
      try {
        const data = await fetchUserOrders(email);
        const plainData = JSON.parse(JSON.stringify(data));
        setData(plainData);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchOrders();
  }, [email]);

  return (
    <aside
      className={`sm:py-5 flex ${
        mobile ? "min-w-[250px]" : "min-w-[300px]"
      } flex-col ${mobile ? "items-start" : "items-center"} max-w-[400px] ${
        mobile ? "justify-start gap-[100px]" : "justify-between"
      } h-full`}
    >
      <div
        className=" w-[80%] relative cursor-pointer"
        onClick={() => router.push("/")}
      >
        <h1 className="font-mono capitalize font-bold text-xl sm:text-xl xl:text-2xl  ">
          TimeTrove
        </h1>
        <div className="absolute left-[10%] sm:left-[20%] bg-purple rounded-xl w-[15%] h-[4px]"></div>
      </div>

      <div className="capitalize space-y-1 text-sm sm:text-[13px] font-semibold w-[80%]">
        <h3
          className={`py-3 px-4 rounded-2xl flex items-center gap-3 ${
            path == "/shop"
              ? "bg-purple text-white"
              : "hover:bg-purple hover:text-white"
          } transition-colors cursor-pointer`}
          onClick={() => handleRedirect("/")}
        >
          <Home size={25} /> Home
        </h3>

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
            <span className="font-bold pop">{data?.totalOrders || 0}</span>
          </h4>
          {!data?.items ? (
            <>
              <div className="w-full flex gap-2 justify-start items-center">
                <Skeleton className="w-[60px] h-[70px] bg-grey.200"></Skeleton>
                <Skeleton className="w-[70%] h-[20px] bg-grey.200"></Skeleton>
              </div>
              <div className="w-full flex gap-2 justify-start items-center">
                <Skeleton className="w-[60px] h-[70px] bg-grey.200"></Skeleton>
                <Skeleton className="w-[70%] h-[20px] bg-grey.200"></Skeleton>
              </div>
            </>
          ) : (
            data.items.map((order, i) => (
              <HoverCardOrder key={i} order={order} />
            ))
          )}

          {data?.totalOrders == 0 && (
            <p className="font-semibold text-[14px]">No Order Recorded</p>
          )}
          {data?.totalOrders >= 2 && (
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
          className="w-30 hover:text-purple  bg-white text-black text-md hover:bg-white"
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
      <HoverCardTrigger asChild className="hover:text-purple">
        <div
          onClick={() => router.push(`/shop/account/${order.orderId}`)}
          className="cursor-pointer flex gap-2 text-sm sm:text-md items-center w-[90%]"
        >
          {/* <div className="w-7 h-7 border-black border-2 rounded-lg"></div> */}
          <Image
            className="rounded-lg border"
            width={50}
            height={50}
            src={order.products?.img}
            alt={order.products?.name}
          />
          <p className="font-semibold truncate ">{order.products?.name}</p>
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
          src={order.products?.img}
          alt={order.products?.name}
        />
        <div className="items-center w-[90%] gap-[30px] text-sm">
          <div className="space-y-1">
            <h3 className="font-bold truncate ">{order.products?.name}</h3>
            <div className="flex gap-2 text-[#999999]">
              <div className="flex items-center gap-2 font-semibold">
                <p>Color :</p>
                <div
                  className={`w-5 h-5 rounded-full border-2`}
                  style={{
                    background:
                      order?.products?.color || order?.products?.variant,
                  }}
                ></div>
              </div>
              <p className="font-semibold text-[#999999] text-sm truncate ">
                Size: {order.products?.size}
              </p>
            </div>
          </div>
          <div className="flex font-semibold gap-[30px]">
            <p className=" truncate font-bold">Rs {order?.amount}</p>
            <p className="truncate text-[#999999]">Qty {order.products?.qty}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
