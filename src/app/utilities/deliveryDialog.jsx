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

export function DeliveryDialog({
  addressName,
  firstName,
  lastName,
  state,
  city,
  landmark,
  pincode,
  addressType,
}) {
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
      addressType: "",
    },
  });

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <Dialog className="w-full">
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <Button className="mt-3 mx-auto">Add New Address</Button>
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
                  <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                  <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                      {...field}
                      defaultValue="work"
                      className="flex"
                      id="addressType"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="home" id="r1" />
                        <Label htmlFor="r1" className="cursor-pointer">
                          Home
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="work" id="r2" />
                        <Label htmlFor="r2" className="cursor-pointer">
                          Work
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
