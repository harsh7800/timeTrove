import User from "../models/User";
import { EditDeliveryDialog } from "./editDeliveryDialog";
const { Home, Briefcase, Trash } = require("lucide-react");

export const AddressCard = async ({
  id,
  addressType,
  addressName,
  firstName,
  lastName,
  phoneNum,
  state,
  city,
  pincode,
  landmark,
}) => {
  async function getAddress(id) {
    "use server";
    await connectDb();
    const user = await User.findOne({ email });
    return user ? user.billingAddress : [];
  }
  return (
    <div className=" w-[400px] border justify-between flex py-4 px-3 gap-3 items-center rounded-lg">
      <div className="space-y-2">
        <h2 className="font-semibold flex items-center gap-1 text-[16px]">
          {addressType == "home" ? <Home /> : <Briefcase />} {addressName}
        </h2>
        <p className="font-semibold text-[#808080] text-[13px]">
          {pincode}, {landmark}, <br /> {city}, {state}
        </p>
      </div>
      <div className="flex gap-2">
        <EditDeliveryDialog
          addressName={addressName}
          firstName={firstName}
          lastName={lastName}
          phoneNum={phoneNum}
          pincode={pincode}
          landmark={landmark}
          city={city}
          state={state}
          addressType={addressType}
        />
        <Trash
          //   onClick={}
          size={20}
          className="cursor-pointer hover:text-[#808080] transition-all"
        />
      </div>
    </div>
  );
};
