import { LogOut, TrendingUp, Zap } from "lucide-react";
import React from "react";
import { PiHoodie, PiSneaker } from "react-icons/pi";
import { HoverCardOrder } from "./asideNav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <aside className="border-r border-2 min-w-[350px] flex flex-col items-center max-w-[400px] justify-between py-5">
      <Skeleton className="bg-grey.200 w-[90%] h-[40px]" />

      <div className="capitalize space-y-4 text-lg font-semibold w-[80%]">
        <Skeleton className="bg-grey.200 w-[90%] h-[40px]" />

        <Skeleton className="bg-grey.200 w-[90%] h-[40px]" />

        <Skeleton className="bg-grey.200 w-[90%] h-[40px]" />

        <Skeleton className="bg-grey.200 w-[90%] h-[40px]" />

        <Skeleton className="bg-grey.200 w-[90%] h-[40px]" />
      </div>

      <div className="w-[80%] flex flex-col items-center justify-center border-t space-y-3 pt-5">
        <Skeleton className="bg-grey.200 w-full h-[40px]" />
        <Skeleton className="bg-grey.200 w-[80%] h-[40px]" />
        <Skeleton className="bg-grey.200 w-[80%] h-[40px]" />
        <Skeleton className="bg-grey.200 w-[80%] h-[40px]" />
      </div>

      <Skeleton className="bg-grey.200 w-[80%] h-[40px]" />
    </aside>
  );
};

export default Loading;
