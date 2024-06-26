"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaCheck, FaCircleCheck } from "react-icons/fa6";
import { useToast } from "@/components/ui/use-toast";
import { IoMdCloseCircle } from "react-icons/io";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ForgotPass from "../utilities/forgotPass";
import { useRouter } from "next-nprogress-bar";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useStore } from "../store/zustandStore";
import { NextURL } from "next/dist/server/web/next-url";
import { useSearchParams } from "next/navigation";
export default function LoginForm({ setToggle }) {
  // const session = getServerSession();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [togglePassword, setTogglePassword] = useState(false);
  const login = useStore((state) => state.login);
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
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
      remember_me: false,
    },
  });

  let email = form.getValues().email;
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
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/login`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.getValues()),
        },
        { cache: "reload" }
      );
      const data = await response.json();

      if (response.ok) {
        let accountCred = {
          token: data.token,
          username: data.username,
          email: data.email,
          billingAddress: data.billingAddress,
        };
        login(accountCred);
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
            if (redirect == "checkout") {
              router.push("/shop/checkout");
            } else {
              router.push("/shop");
            }
          },
        });
        setTimeout(() => {
          if (redirect == "checkout") {
            router.push("/shop/checkout");
          } else {
            router.push("/shop");
          }
        }, 1500);
        // router.push("/");
        // let verifiedData = await verifyJWT(
        //   data.token,
        //   process.env.JWT_SECRET_KEY
        // );
        // if (verifiedData.success) {
        //   router.push("/");
        // }
        // console.log(verifiedData.data);
      } else {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <IoMdCloseCircle size={15} color="#ff1a1a" /> {data.message}
            </div>
          ),
          duration: "3000",
          className: "bg-white",
          onSwipeEnd: () => {
            if (data.message.includes("Password")) {
              form.resetField("password");
            } else if (data.message.includes("No User Found")) {
              form.reset();
            } else null;
          },
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        duration: 3000,
        className: "bg-white",
      });
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
      <div className=" bg-white rounded-lg lg:rounded-none lg:bg-transparent relative lg:shadow-none w-full h-full max-h-[550px] flex flex-col justify-center items-center gap-4">
        <div className="w-full text-center">
          <h1 className="text-2xl lg:text-4xl font-noto_serif_display font-medium noto">
            Welcome Back
          </h1>
          <p className="capitalize font-semibold text-xs lg:text-sm mt-3 opacity-80">
            enter your email and password to access to account
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
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
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
                  <FormItem className="relative">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <div className="w-full relative flex items-center justify-around">
                        <Input
                          name="password"
                          id="password"
                          type={togglePassword ? "text" : "password"}
                          className="placeholder:font-medium opacity-80"
                          placeholder="Enter Your Password"
                          {...field}
                        />
                        <div
                          className="text-voilet absolute right-2 cursor-pointer"
                          onClick={() => setTogglePassword(!togglePassword)}
                        >
                          {togglePassword ? (
                            <FaEye color="#d633ff" />
                          ) : (
                            <FaEyeSlash color="grey" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="remember_me"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="remember_me"
                            type="checkbox"
                            className="placeholder:font-medium w-[17px] opacity-80 cursor-pointer"
                            placeholder="Enter Your Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormLabel htmlFor="remember_me" className="cursor-pointer">
                    Remember me
                  </FormLabel>
                </div>
                <ForgotPass email={email} />
              </div>
            </form>
          </Form>
        </div>
        <div className="w-full flex flex-col justify-center items-center font-poppins gap-2 font-medium">
          <button
            disabled={!form.formState.isValid}
            className={`w-[80svw] sm:w-2/3 min-w-[150px] py-2 rounded-lg bg-black ${
              !form.formState.isValid ? "opacity-50" : "opacity-100"
            } text-white hover:opacity-70 transition-all`}
            onClick={onSubmit}
            type="submit"
          >
            Login
          </button>
          {/* <button
          className="border w-[80svw] sm:w-2/3 min-w-[150px] py-1.5 rounded-lg bg-white capitalize flex justify-center items-center gap-2 hover:bg-grey transition-all font-bold"
          onClick={async (e) => {
            let res = await signIn("google", {
              callbackUrl: "http://localhost:3000/shop",
            });
          }}
        >
          <FcGoogle size={30} /> Sign In With google
        </button> */}
        </div>
        <p className="font-semibold text-sm mt-5">
          Don&apos;t Have a Account?{" "}
          <span
            className="text-purple cursor-pointer hover:underline"
            onClick={() => setToggle(true)}
          >
            Sign Up
          </span>
        </p>
      </div>
    </Suspense>
  );
}
