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
      {Array.from({ length: 20 }, (_, i) => (
        <Skeleton
          key={i}
          className="flex flex-col w-[250px] space-y-5 border px-2 pt-2 pb-4"
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
  );
}
