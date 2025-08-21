"use client";

import { useState } from "react";
import { useUnauthForgotPassword } from "../api/use-unAuth-forgot-passowrd";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const forgotPassword = useUnauthForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      forgotPassword.mutate({ email });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto mt-10 max-w-md rounded border p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block font-medium">Email address</label>
          <input
            type="email"
            className="mb-4 w-full rounded border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className=" w-full"
            disabled={forgotPassword.isPending}>
            {forgotPassword.isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {forgotPassword.isError && (
          <p className="mt-4 text-red-600">{forgotPassword.error.message}</p>
        )}
        {forgotPassword.isSuccess && (
          <p className="mt-4 text-green-600">{forgotPassword.data.message}</p>
        )}
      </div>
    </div>
  );
}
