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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ForgotPass from "../utilities/forgotPass";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/loginAuth";
export const LoginForm = ({ setToggle }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const state = useSelector((state) => state.LoginAuth.user);
  const dispatch = useDispatch();
  console.log(state);
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
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        dispatch(
          login({
            user: data,
          })
        );
        localStorage.setItem("user", JSON.stringify(data));
        console.log(2);
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
            router.push("/shop");
          },
        });
        setTimeout(() => {
          router.push("/shop");
        }, 3000);
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
      console.log(error);
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
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="w-full relative flex items-center justify-around">
                      <Input
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
          } text-white hover:opacity-70`}
          onClick={onSubmit}
          // onClick={() => console.log(process)}
          type="submit"
        >
          Sign In{" "}
        </button>
        <button className="border w-[80svw] sm:w-2/3 min-w-[150px] py-1.5 rounded-lg bg-white capitalize flex justify-center items-center gap-2 hover:opacity-50">
          <FcGoogle size={30} /> Sign In With google
        </button>
      </div>
      <p className="font-semibold text-sm mt-5">
        Don&apos;t Have a Account?{" "}
        <span
          className="text-purple-600 cursor-pointer hover:underline"
          onClick={() => setToggle(true)}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};
