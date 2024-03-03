"use client";
import { useEffect, useState } from "react";
// import { Address } from "../store/zustandStore";
import { EditDeliveryDialog } from "./editDeliveryDialog";
import { DeleteAddress } from "./deleteAddress";
const { Home, Briefcase, Trash } = require("lucide-react");

export const AddressCard = ({
  addressType,
  addressName,
  pincode,
  landmark,
  city,
  state,
  firstName,
  lastName,
  phoneNum,
  id,
}) => {
  const [localState, setLocalState] = useState({
    addressType,
    addressName,
    pincode,
    landmark,
    city,
    state,
    firstName,
    lastName,
    phoneNum,
    id,
  });

  // Function to update state when new props are received
  useEffect(() => {
    setLocalState({
      addressType,
      addressName,
      pincode,
      landmark,
      city,
      state,
      firstName,
      lastName,
      phoneNum,
      id,
    });
  }, [
    addressType,
    addressName,
    pincode,
    landmark,
    city,
    state,
    firstName,
    lastName,
    phoneNum,
    id,
  ]);
  // const addressData = Address((state) => state.addressData);
  // const updateAddress = Address((state) => state.updateAddress);
  return (
    <div className="w-full lg:w-[350px] border justify-between flex py-4 px-3 gap-3 items-center rounded-lg">
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
          localState={localState}
          addressName={addressName}
          firstName={firstName}
          lastName={lastName}
          phoneNum={phoneNum}
          pincode={pincode}
          landmark={landmark}
          city={city}
          state={state}
          addressType={addressType}
          id={id}
        />
        <DeleteAddress addressName={addressName} id={id} />
      </div>
    </div>
  );
};
