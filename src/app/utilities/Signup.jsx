import React, { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

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
import { useRouter } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { Loader2, X } from "lucide-react";
import { useStore } from "../store/zustandStore";

export default function Signup({ setToggle }) {
  const { toast } = useToast();
  const router = useRouter();
  const login = useStore((state) => state.login);
  const formSchema = z.object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    email: z
      .string()
      .min(4, {
        message: "email must be a valid one.",
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
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters.",
      })
      .refine((data) => {
        let { password, confirm_password } = form.getValues();
        return password == confirm_password;
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  let values = form.getValues();

  async function onSubmit(e) {
    e.preventDefault();
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
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email.toLowerCase(),
            password: values.password,
            role: "user",
          }),
        }
      );

      let data = await response.json();
      if (response.ok) {
        login(data);
        toast({
          title: (
            <div className="flex items-center gap-2">
              <FaCircleCheck size={15} color="#2eb82e" /> {data.message}
            </div>
          ),
          duration: "3000",
          className: "bg-white",
          variant: "success",
          onSwipeEnd: () => {
            router.push("/");
          },
        });
        setTimeout(() => {
          router.push("/shop");
        }, 1500);
      } else {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <IoMdCloseCircle color="#ff1a1a" /> {data.message}
            </div>
          ),
          duration: "3000",
          className: "bg-white",
        });
      }
    } catch (error) {
      console.log(error);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }
  return (
    <Suspense
      fallback={
        <p>
          <Loader2 className="animate-spina" size={20} />
        </p>
      }
    >
      <div className=" bg-white rounded-lg lg:rounded-none lg:bg-none relative lg:shadow-none w-full h-full max-h-[650px] flex flex-col justify-center items-center gap-4">
        <div className="w-full text-center">
          <h1 className="text-2xl lg:text-4xl font-noto_serif_display font-medium noto">
            Create Your Account
          </h1>
          <p className="capitalize font-semibold text-xs lg:text-sm mt-3 opacity-80">
            enter your detail below to create a new account
          </p>
        </div>

        <div className="w-[80svw] sm:w-2/3 min-w-[150px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:font-medium opacity-80 placeholder-shown:font-medium"
                        placeholder="Enter Your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  <FormItem className=" relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="placeholder:font-medium opacity-80"
                        placeholder="Enter Your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Min 8 letters required
                    </FormDescription>

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
            disabled={!form.formState.isValid}
            className={`w-[80svw] sm:w-2/3 min-w-[150px] py-2 rounded-lg bg-black ${
              !form.formState.isValid ? "opacity-50" : "opacity-100"
            } text-white hover:opacity-70 transition-all`}
            onClick={onSubmit}
            type="submit"
          >
            Sign Up{" "}
          </button>
        </div>
        <p className="text-xs font-bold mt-[-10px]">or</p>

        <button
          className="w-[80svw] font-bold border sm:w-2/3 min-w-[150px] py-2 rounded-md hover:opacity-70 mt-[-10px]"
          onClick={() => setToggle(false)}
          type="submit"
        >
          Login
        </button>
      </div>
    </Suspense>
  );
}
