"use client";

import { useShallow } from "zustand/react/shallow";
import { DropDownMenu } from "./DropDown";
import { Button } from "@/components/ui/button";
import { useStore } from "../store/zustandStore";

const CheckLogin = () => {
  const user = useStore(useShallow((state) => state.user));
  return (
    <>
      {user.token ? (
        <div className="flex items-center gap-2">
          <DropDownMenu />
          <p className="font-bold hidden md:block">{user.username}</p>
        </div>
      ) : (
        <Button className="bg-black text-white hover:bg-white hover:text-black transition-all font-bold rounded-xl">
          Login
        </Button>
      )}
    </>
  );
};

export default CheckLogin;
