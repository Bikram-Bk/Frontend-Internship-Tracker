"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useResetPassword } from "../api/use-reset-password.";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();
  const resetPassword = useResetPassword();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    resetPassword.mutate(
      { token, newPassword },
      {
        onSuccess: () => router.push("/login"),
      }
    );
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-center text-2xl font-bold text-blue-900">
          Reset Your Password
        </h2>
        <p className="mb-4 text-center text-gray-600">
          Enter your new password below. Make sure it is strong and secure.
        </p>

        <div>
          <label className="mb-1 block font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {error && <p className="text-center text-red-600">{error}</p>}
        {resetPassword.isError && (
          <p className="text-center text-red-600">
            {resetPassword.error.message}
          </p>
        )}
        {resetPassword.isSuccess && (
          <p className="text-center text-green-600">
            Password reset successful! Redirecting to login...
          </p>
        )}

        <button
          type="submit"
          disabled={resetPassword.isPending}
          className="bg-primary-800 w-full rounded py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-800">
          {resetPassword.isPending ? "Resetting..." : "Reset Password"}
        </button>

        <p className="mt-2 text-center text-xs text-gray-500">
          Your password must be at least 8 characters long.
        </p>
      </form>
    </div>
  );
}
