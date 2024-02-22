"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full px-5 py-5 space-y-5">
      <div className=" flex justify-between items-center">
        <Skeleton className="h-[45px] w-[50%] rounded-xl bg-grey.200" />
        <div className="flex items-center gap-5">
          <Skeleton className="h-[45px] w-[120px] rounded-xl bg-grey.200" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-[50px] w-[50px] rounded-full bg-grey.200" />

            <Skeleton className="h-[30px] w-[70px] rounded-xl bg-grey.200" />
          </div>
        </div>
      </div>
    </div>
  );
}
