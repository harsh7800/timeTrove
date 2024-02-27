import { DeliveryDialog } from "@/app/utilities/deliveryDialog";
import { Button } from "@/components/ui/button";
import { Edit, Home } from "lucide-react";

export default function Page() {
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
        <AddressCard />
        <AddressCard />
        <AddressCard />
        <AddressCard />
        <AddressCard />
      </div>
      <DeliveryDialog />
    </div>
  );
}

const AddressCard = () => {
  return (
    <div className=" w-[400px] border flex py-4 px-2 gap-3 items-center rounded-lg">
      <div className="w-[80px] h-[80px] rounded-lg border"></div>
      <div className="space-y-2">
        <h2 className="font-semibold flex items-center gap-1 text-[16px]">
          <Home /> Home
        </h2>
        <p className="font-semibold text-[#808080] text-[13px]">
          431804, Sarafa Line, Sonar Gully, Kinwat, <br /> Nanded, Maharastra
        </p>
      </div>
      <Edit
        size={20}
        className="cursor-pointer hover:text-[#808080] transition-all"
      />
    </div>
  );
};
