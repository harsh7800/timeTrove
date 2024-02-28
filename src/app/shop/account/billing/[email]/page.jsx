import User from "@/app/models/User";
import { AddressCard } from "@/app/utilities/addressCard";
import { DeliveryDialog } from "@/app/utilities/deliveryDialog";
import connectDb from "@/lib/mongoose";

export default async function Page({ params }) {
  let email = decodeURIComponent(params.email);
  async function getAddress() {
    "use server";
    await connectDb();
    const user = await User.findOne({ email });
    return user ? user.billingAddress : [];
  }

  let data = await getAddress();
  return (
    <div className=" w-full px-4 sm:px-[20px] sm:py-[30px] py-0">
      <div className=" w-full border-b pb-3 relative ">
        <h3 className="font-bold leading-7 text-gray-900  sm:text-2xl text-lg">
          Billing Address
        </h3>
        <p className="mt-1 max-w-2xl text-sm  leading-3 sm:leading-6 text-gray-500">
          List of All Billing Address
        </p>
      </div>
      <div className="mt-4 gap-3 flex flex-wrap">
        {data?.map((item, i) => {
          return (
            <AddressCard
              addressType={item.addressType}
              addressName={item.addressName}
              firstName={item.firstName}
              lastName={item.lastName}
              landmark={item.landmark}
              city={item.city}
              phoneNum={item.phoneNum}
              state={item.state}
              pincode={item.pincode}
              key={i}
              id={i}
            />
          );
        })}
      </div>
      <DeliveryDialog getAddress />
    </div>
  );
}
