import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const Signup = ({ setToggle }) => {
  const formSchema = z.object({
    email: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    remember_me: z.boolean({
      message: "Remember me must be a boolean value.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  let email = form.getValues().email;

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(form.getValues());
  }
  return (
    <div className=" bg-white rounded-lg lg:rounded-none lg:bg-none relative lg:shadow-none w-full h-full max-h-[550px] flex flex-col justify-center items-center gap-4">
      <div className="w-full text-center">
        <h1 className="text-2xl lg:text-4xl font-noto_serif_display font-medium noto">
          Create Your Account
        </h1>
        <p className="capitalize font-semibold text-xs lg:text-sm mt-3 opacity-80">
          enter your email and password to create a new account
        </p>
      </div>

      <div className="w-[80svw] sm:w-2/3 min-w-[150px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:font-medium opacity-80 placeholder-shown:font-medium"
                      placeholder="Enter Your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="placeholder:font-medium opacity-80"
                      placeholder="Enter Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="placeholder:font-medium opacity-80"
                      placeholder="Enter Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="w-full flex flex-col justify-center items-center font-poppins gap-2 font-medium space-y-1 mt-2">
        <button
          className="w-[80svw] sm:w-2/3 min-w-[150px] py-2 rounded-md bg-black text-white hover:opacity-70"
          onClick={onSubmit}
          type="submit"
        >
          Sign Up{" "}
        </button>
      </div>
      <p className="text-lg font-bold mt-[-10px]">OR</p>

      <button
        className="w-[80svw] font-bold border sm:w-2/3 min-w-[150px] py-2 rounded-md hover:opacity-70 mt-[-10px]"
        onClick={() => setToggle(false)}
        type="submit"
      >
        Login
      </button>
    </div>
  );
};
