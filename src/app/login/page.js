"use client";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import illustrationBG from "../../../public/vector-purple-landscape-illustration.png";
import tLogo from "../../../public/t-logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoginForm } from "../utilities/LoginForm";
import { useState } from "react";
import { Signup } from "../utilities/Signup";

export default function Page() {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className="flex justify-center items-center w-full h-[100dvh] min-h-[550px] gap-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${illustrationBG.src}')` }}
    >
      <div className="w-[75svw] lg:min-w-[800px] max-w-[1100px] rounded-3xl h-[90dvh] min-h-[550px] bg-transparent flex flex-col lg:flex-row items-center justify-between max-h-[750px]">
        <div className="hidden lg:block w-[90%] lg:w-1/2 rounded-3xl h-full bg-transparent border-white border-[6px] lg:rounded-tr-none lg:rounded-br-none relative lg:min-h-[550px]">
          <p className="text-white text-md absolute left-5 top-4 font-mono uppercase font-medium tracking-wider">
            Broken crayons are still colors
          </p>
          {/* <hr className="border-t-[1.8px] border-white my-2 w-1/4 absolute right-14 top-[2.5%]" /> */}

          <div className="text-5xl font-bold w-full text-left space-y-2 text-white absolute bottom-8 left-4 capitalize noto">
            <h1>Get</h1>
            <h1>everything</h1>
            <h1>you want</h1>
            <p className="text-xs font-medium pop tracking-wider mt-5">
              Take the risk or lose the chance,
              <br />
              If you want it, work for it.
            </p>
          </div>
        </div>

        <div className="w-[90svw] sm:w-[90%] lg:w-1/2 h-full lg:h-full border-tl border-bl lg:rounded-tl-none lg:rounded-bl-none rounded-lg lg:rounded-3xl bg-transparent lg:bg-white flex justify-center relative items-center py-0 lg:py-0">
          {!toggle ? (
            <LoginForm setToggle={setToggle} />
          ) : (
            <Signup setToggle={setToggle} />
          )}
        </div>
      </div>
    </div>
  );
}
