"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStore } from "../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { useRouter } from "next-nprogress-bar";
import { DialogClose } from "@radix-ui/react-dialog";

export function DeliveryDialog({
  addressName,
  firstName,
  lastName,
  state,
  city,
  landmark,
  pincode,
  addressType,
  id,
}) {
  const router = useRouter();
  const email = useStore(useShallow((state) => state.user.email));
  const updateField = useStore(useShallow((state) => state.updateField));
  const { toast } = useToast();
  const formSchema = z.object({
    addressName: z.string().min(2, {
      message: "Address Name must be at least 2 characters.",
    }),
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
    phoneNum: z
      .string()
      .min(12, {
        message: "Phone Number must be at least 12 characters.",
      })
      .refine((value) => /^\+\d{1,3}\d+$/.test(value), {
        message:
          "Invalid Phone Number format. It should start with a country code and contain only digits.",
      }),

    state: z.string().min(2, {
      message: "State must be at least 2 characters.",
    }),
    city: z.string().min(2, {
      message: "State must be at least 2 characters.",
    }),
    pincode: z
      .string()
      .min(6, {
        message: "Pincode must be at least 6 characters.",
      })
      .refine((value) => /^\d+$/.test(value), {
        message: "Pincode must contain only digits.",
      }),
    landmark: z.string().min(2, {
      message: "Landmark must be at least 2 characters.",
    }),
    addressType: z.string().min(2, {
      message: "Please State The Address Type",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressName: addressName,
      firstName: firstName,
      lastName: lastName,
      state: state,
      city: city,
      landmark: landmark,
      pincode: pincode,
      addressType: addressType,
    },
  });

  async function onSubmit(data) {
    toast({
      title: (
        <div className="flex items-center gap-3 text-black text-md">
          <Loader2 className="animate-spin" />
          <p>Loading..</p>
        </div>
      ),
      duration: 10000, // Adjust the duration as needed
      className: "bg-white",
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/account/addAddress`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ email, data }),
      }
    );
    if (response.ok) {
      let address = await response.json();
      updateField({ billingAddress: address.billingAddress });
      toast({
        title: (
          <div className="flex items-center gap-2">
            <FaCircleCheck size={15} color="#2eb82e" /> New Address Added
          </div>
        ),
        duration: "3000",
        className: "bg-white",
        variant: "success",
      });
      router.refresh();
      form.reset();
    } else {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <IoMdCloseCircle size={15} color="#ff1a1a" /> Error Occurred Try
            Again
          </div>
        ),
        duration: "3000",
        className: "bg-white",
      });
    }
  }
  return (
    <Dialog className="w-full">
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <Button
            className="mt-3 mx-auto bg-black text-white hover:bg-white hover:text-black border"
            variant=""
          >
            Add New Address
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[90%] sm:max-w-[450px] bg-white"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="addressName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="addressName">
                    Name of the Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium placeholder-shown:text-[14px]"
                      placeholder="Enter Your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />

            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <FormControl>
                      <Input
                        id="firstName"
                        className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium"
                        placeholder="Enter Your First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        id="lastName"
                        className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium"
                        placeholder="Enter Your Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phoneNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phoneNum">Phone No.</FormLabel>
                  <FormControl>
                    <Input
                      id="phoneNum"
                      className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium"
                      placeholder="Enter Your phone no."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="state">State</FormLabel>
                    <FormControl>
                      <Input
                        id="state"
                        className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium"
                        placeholder="Enter Your State"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="city">City</FormLabel>
                    <FormControl>
                      <Input
                        id="city"
                        className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium"
                        placeholder="Enter Your City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="pincode">Pincode</FormLabel>
                    <FormControl>
                      <Input
                        id="pincode"
                        className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium"
                        placeholder="Enter Your Pincode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="landmark">Landmark</FormLabel>
                    <FormControl>
                      <Input
                        id="district"
                        className="placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[14px] opacity-80 placeholder-shown:font-medium"
                        placeholder="Enter Your Landmark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="addressType">Address Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="flex"
                      id="addressType"
                      {...field}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="home"
                          id="home"
                          checked={field.value === "home"}
                        />
                        <Label htmlFor="home" className="cursor-pointer">
                          Home
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="work"
                          id="work"
                          checked={field.value === "work"}
                        />
                        <Label htmlFor="work" className="cursor-pointer">
                          Work
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
            {!form.formState.isValid ? (
              <Button type="submit" className="w-full bg-black text-white">
                Save changes
              </Button>
            ) : (
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="w-full bg-black text-white border"
                >
                  Save changes
                </Button>
              </DialogClose>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
