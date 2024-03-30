import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full px-0 flex flex-wrap gap-3">
      <div className="flex px-5 items-center w-full gap-2 justify-between border-b-2 h-20 rounded-none ">
        <Skeleton className="h-10 w-[150px] bg-grey.200" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[100px] bg-grey.200" />
          <Skeleton className="h-10 w-[100px] bg-grey.200" />
          <Skeleton className="h-10 w-[100px] bg-grey.200" />
        </div>
        <Skeleton className="h-10 w-[50px] bg-grey.200" />
      </div>
      <div className="w-full px-1 sm:px-5 pt-2 grid grid-cols-2 sm:flex gap-2 flex-nowrap sm:flex-wrap justify-center lg:justify-normal items-center ">
        {Array.from({ length: 20 }, (_, i) => (
          <Skeleton
            key={i}
            className="border w-full sm:w-[250px] h-[fit] px-2 py-2 rounded-lg relative hover:shadow-shadow-2 transition-all space-y-5"
          >
            <Skeleton className="h-[125px] w-full rounded-xl bg-grey.200" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/5 bg-grey.200" />
              <Skeleton className="h-4 w-5/6 bg-grey.200" />
              <Skeleton className="h-4 w-1/4 bg-grey.200" />
            </div>
            <div className="flex w-full gap-2">
              <Skeleton className="h-10 w-1/2 bg-grey.200" />
              <Skeleton className="h-10 w-1/2 bg-grey.200" />
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
