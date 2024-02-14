import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className=" w-full flex flex-col space-y-3 items-center">
      <h1 className="font-bold font-mono text-grey.200 text-[100px]">404!</h1>
      <h2 className="font-medium text-[30px]">Page not Found</h2>
      <p className="font-medium text-[20px] text-center">
        Seems Like you have lost your way. Lets&apos;s being you back home to{" "}
        <Link href="/" className="underline text-[purple]">
          TimeTrove
        </Link>
      </p>
      <Image
        width={550}
        height={450}
        src="https://c.housingcdn.com/demand/s/client/common/assets/404.66115e79.png"
        alt="404"
      />
    </div>
  );
}
