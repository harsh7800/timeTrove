import Order from "@/app/models/Order";
import connectDb from "@/lib/mongoose";
import React from "react";
import Step from "./stepper";
import { CircleUser, MapPin, PackageOpen } from "lucide-react";
import Image from "next/image";

const Page = async ({ params }) => {
  async function getAddress() {
    "use server";
    await connectDb();
    const order = await Order.findOne({ orderId: params.order }).lean();
    return order ? order : [];
  }
  let data = await getAddress();
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    weekday: "long",
  };
  return (
    <div className="w-full  px-2 sm:px-5">
      <div className="space-y-2 ">
        <h1 className="font-bold text-md md:text-2xl flex gap-2 sm:gap-5">
          Order: {data.orderId}
          <span className="bg-[#e6ccff] text-purple px-3 sm:px-6 text-[14px] rounded-lg">
            Placed
          </span>
        </h1>
        <p className="font-semibold text-sm">
          Date: {data?.createdAt?.toLocaleDateString("en-GB", options)}
        </p>
      </div>

      <div className="justify-start w-full flex md:hidden">
        <Step style="vertical" index={0} trackID={data.trackingId} />
      </div>
      <div className="hidden justify-start w-full md:flex">
        <Step style="horizontal" index={0} trackID={data.trackingId} />
      </div>
      <div className="px-2 md:px-0 flex items-start flex-wrap md:flex-nowrap justify-between w-full xl:w-[80%] space-y-3 divide-y-2 md:divide-y-0">
        <div className="px-2 font-semibold space-y-4">
          <h1 className=" flex gap-2 opacity-60">
            <PackageOpen />
            Order Details
          </h1>
          <div>
            <p className="opacity-60">Order Date</p>
            <p> {data.createdAt.toLocaleDateString("en-GB", options)}</p>
          </div>
          <div>
            <p className="opacity-60">Delivery Estimation</p>
            <p>4 Days</p>
          </div>
          <div>
            <p className="opacity-60">payment Mode</p>
            <p>{data.paymentInfo.method}</p>
          </div>
        </div>

        <div className="px-2 pt-[20px] md:pt-0 font-semibold space-y-4">
          <h1 className=" flex gap-2 opacity-60">
            <MapPin />
            Location
          </h1>
          <div>
            <p className="opacity-60">Delivery Address</p>
            <p>
              {" "}
              {data.address.addressName}, {data.address.city},
              {data.address.pincode}
            </p>
          </div>
        </div>

        <div className="px-2 pt-[20px] md:pt-0 font-semibold space-y-4">
          <h1 className=" flex gap-2 opacity-60">
            <CircleUser />
            Customer Details
          </h1>
          <div>
            <p className="opacity-60">Full Name</p>
            <p>
              {" "}
              {data.address.firstName} {data.address.lastName}
            </p>
          </div>
          <div>
            <p className="opacity-60">Email</p>
            <p>{data.email}</p>
          </div>
          <div>
            <p className="opacity-60">Contact Info</p>
            <p>{data.address.phoneNum}</p>
          </div>
        </div>
      </div>

      <div className="p-3 mt-[30px]  w-full lg:w-[80%] divide-y-2 space-y-2">
        {Object.keys(data.products).map((product) => {
          return (
            <div key={product} className="flex justify-between py-3">
              <div className="flex gap-3 text-sm sm:text-md">
                <Image
                  className="border w-[60px] sm:w-[100px] rounded-lg bg-grey"
                  src={data.products[product].img}
                  width={100}
                  height={100}
                  alt={product}
                />
                <div className="font-semibold">
                  <h3>{data.products[product].name}</h3>
                  <div className="flex items-center gap-2">
                    <h3 className="capitalize">
                      Size: {data.products[product]?.size}
                    </h3>
                    <h3 className="flex items-center capitalize">
                      Color: &nbsp;
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{
                          background:
                            data.products[product]?.variant ||
                            data.products[product]?.color,
                        }}
                      ></div>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="font-semibold  text-sm sm:text-md w-[80px] text-end sm:w-fit">
                <h3>Rs {data.products[product].price}</h3>
                <h3 className="capitalize opacity-50">
                  Qty: {data.products[product]?.qty}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
