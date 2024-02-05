import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";

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

export const LoginForm = ({ setToggle }) => {
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
      remember_me: "",
    },
  });
  let email = form.getValues().username;

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(form.getValues());
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
                          className="placeholder:font-medium w-[17px] opacity-80"
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
          className="w-[80svw] sm:w-2/3 min-w-[150px] py-2 rounded-lg bg-black text-white hover:opacity-70"
          onClick={onSubmit}
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
