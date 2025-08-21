"use client";
import Link from "next/link";
import { useLogin } from "../api/use_login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginFormSchema, LoginFormValues } from "../utils/auth_types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log(values);
    login({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Welcome Back!
        </h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter your credentials to access your account.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
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
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              Forot your password?{" "}
              <Link
                href="/forgot-password"
                className="text-primary-800 hover:underline">
                Reset password
              </Link>
            </div>
            <Button type="submit" disabled={isPending} className=" w-full">
              Login
            </Button>
          </form>
        </Form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import React from "react";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { loginFormSchema, LoginFormValues } from "../utils/auth_types";
// import { useLogin } from "../api/use_login";

// export default function Login() {
//   const login = useLogin();
// const form = useForm<LoginFormValues>({
//   resolver: zodResolver(loginFormSchema),
//   defaultValues: {
//     email: "",
//     password: "",
//   },
// });

// function onSubmit(values: LoginFormValues) {
//   console.log(values);
//   login.mutate({
//     email: values.email,
//     password: values.password,
//   });
// }

//   return (
//     <div className="flex w-full items-center justify-center pt-[100px] xl:py-[240px]">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="flex flex-col gap-6">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="m@example.com"
//                         type="email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter password"
//                         type="password"
//                         {...field}
//                       />
//                     </FormControl>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 type="submit"
//                 className="bg-primary-800 hover:bg-primary-1000 w-full">
//                 Login
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           <div>
//             Forot your password?{" "}
//             <Link
//               href="/forgot-password"
//               className="text-primary-800 hover:underline">
//               Reset password
//             </Link>
//           </div>
//           <div className="mt-4 text-center text-sm">
//             Don&apos;t have an account?{" "}
//             <a href="/register" className="text-primary-800 hover:underline">
//               Register
//             </a>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
