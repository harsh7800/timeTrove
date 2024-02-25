"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/app/store/zustandStore";
import { updateAccountCred } from "@/app/helpers/updateAccountCred";

export default function Page() {
  const state = useStore((state) => state.user);

  const userDetailsformSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z
      .string()
      .min(4, {
        message: "Username must be at least 4 characters.",
      })
      .refine(
        (data) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            data
          ),
        {
          message: "Invalid email address.",
        }
      ),
  });
  const passwordFromSchema = z.object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "new Password must be at least 8 characters.",
    }),
    confirmNewPassword: z
      .string()
      .min(8, {
        message: "confirm passwword must be at least 8 characters.",
      })
      .refine((data) => {
        let { newPassword, confirmNewPassword } = passwordForm.getValues();
        return newPassword === confirmNewPassword;
      }),
  });

  const userDetailsForm = useForm({
    resolver: zodResolver(userDetailsformSchema),
    defaultValues: {
      username: state.username,
      email: state.email,
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordFromSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  return (
    <div className="px-4 sm:px-[20px] sm:py-[30px] py-0">
      <div className=" w-full border-b pb-5 relative ">
        <h3 className="font-bold leading-7 text-gray-900  sm:text-2xl text-lg">
          Account Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm  leading-3 sm:leading-6 text-gray-500">
          Personal details and Billing address.
        </p>
        <p className="text-[12px] text-gray-500 text-right absolute bottom-0 right-0">
          * Below Field are editable
        </p>
      </div>

      <Form {...userDetailsForm}>
        <div className="mt-6">
          <FormField
            control={userDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="px-0 sm:py-6 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm sm:text-md font-medium leading-6 text-gray-900">
                      Full Name
                    </dt>
                    <Input
                      inputMode="text"
                      name="name"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border-black border-0 bg-[#f2f2f2] py-2 px-2 rounded-md"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userDetailsForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="px-0 sm:py-6 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm sm:text-md font-medium leading-6 text-gray-900">
                      Email Address
                    </dt>
                    <Input
                      inputMode="email"
                      name="email"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border-black border-0 bg-[#f2f2f2] py-2 px-2 rounded-md"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!userDetailsForm.formState.isValid}
            onClick={async () => {
              let data = await updateAccountCred(
                true,
                false,
                userDetailsForm.getValues(),
                state.token
              );
              console.log(data);
            }}
            className="relative sm:left-[45%] left-[40%] sm:mt-[60px] mt-[10px]"
          >
            Update
          </Button>
        </div>
      </Form>

      <Form {...passwordForm}>
        <div className="mt-0">
          <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="px-0 sm:py-6 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm sm:text-md font-medium leading-6 text-gray-900">
                      Old Password
                    </dt>
                    <Input
                      inputMode="text"
                      name="name"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border-black border-0 bg-[#f2f2f2] py-2 px-2 rounded-md"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="px-0 sm:py-6 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm sm:text-md font-medium leading-6 text-gray-900">
                      New Password
                    </dt>
                    <Input
                      inputMode="email"
                      name="email"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border-black border-0 bg-[#f2f2f2] py-2 px-2 rounded-md"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="px-0 sm:py-6 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm sm:text-md font-medium leading-6 text-gray-900">
                      Confirm Password
                    </dt>
                    <Input
                      inputMode="email"
                      name="email"
                      className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border-black border-0 bg-[#f2f2f2] py-2 px-2 rounded-md"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!passwordForm.formState.isValid}
            className="relative sm:left-[45%] left-[40%] sm:mt-[60px] mt-[10px]"
            onClick={() => {
              updateAccountCred(
                false,
                true,
                passwordForm.getValues(),
                state.token
              );
            }}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
