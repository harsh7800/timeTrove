import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPass = ({ email }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-none bg-none text-sm font-medium hover:opacity-70 cursor-pointer"
          variant="outline"
        >
          Forgot Password?
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg max-w-xs md:max-w-md bg-white">
        <DialogHeader className="w-full">
          <DialogTitle className="text-start text-md">
            Change Your Password
          </DialogTitle>
          <DialogDescription className="text-start text-xs">
            Enter Your Email To Recieve Code
          </DialogDescription>
        </DialogHeader>
        <Input
          sstyle={{
            boxShadow: "none",
            backgroundColor: "transparent",
            border: "none",
          }}
          id="link"
          className="placeholder:font-semibold select-none"
          defaultValue={email}
        />
        <DialogFooter className="w-full flex-row gap-2 lg:flex items-center flex justify-center">
          <DialogClose className="w-1/2">
            <Button
              type="button"
              className="w-full font-bold"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="secondary"
            className="w-1/2 bg-black text-white"
          >
            Get Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPass;
