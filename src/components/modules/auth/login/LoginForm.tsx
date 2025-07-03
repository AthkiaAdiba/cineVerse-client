"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginValidation } from "./loginValidation";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAppDispatch } from "@/components/redux/hooks";
import { setUser } from "@/components/redux/features/auth/authSlice";
import { useLoginMutation } from "@/components/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/components/types/user";
import Cookies from 'js-cookie';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(loginValidation),
  });

  const [login] = useLoginMutation();

  const {
    formState: { isSubmitting, isValid },
    watch
  } = form;

  // Watch email and password fields
  const email = watch('email');
  const password = watch('password');

  const handleFillCredentials = (email: string, password: string) => {
    form.setValue('email', email);
    form.setValue('password', password);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Logging in');
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;

      Cookies.set('accessToken', res?.data?.accessToken, { expires: 7, secure: true });

      dispatch(setUser({
        user: user,
        token: res?.data?.accessToken
      }));
      router.push(redirect || "/");
      toast.success(res.message, { id: toastId });
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-black/70 p-8 rounded-lg border-2 border-blue-400 w-full max-w-sm shadow-xl backdrop-blur"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 tracking-widest">
          LOGIN FORM
        </motion.h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label className="text-white">Email </Label>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="bg-gray-800 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const [showPassword, setShowPassword] = useState(false);

                return (
                  <FormItem className="mt-4 relative">
                    <Label className="text-white">Password</Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          value={field.value || ""}
                          className="bg-gray-800 text-white pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-2 cursor-pointer flex items-center text-gray-400 hover:text-white"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                );
              }}
            />

            <motion.div>
              <Button
                type="submit"
                disabled={!email || !password || isSubmitting}
                className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 mt-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "LOGGING IN..." : "LOGIN"}
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* <div className="mt-4 space-y-2">
          <Button
            type="button"
            onClick={() => handleFillCredentials("admin@gmail.com", "123456")}
            className="w-full cursor-pointer bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700"
          >
            Fill Admin Credentials
          </Button>
          <Button
            type="button"
            onClick={() => handleFillCredentials("user@gmail.com", "123456")}
            className="w-full cursor-pointer bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700"
          >
            Fill User Credentials
          </Button>
        </div> */}

        <p className="text-center mt-4 text-white">
          You have no account?{" "}
          <Link
            href="/register"
            className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold hover:underline"
          >
            REGISTER HERE
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
