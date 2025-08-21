"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { APP_BASE_URL } from "../utils/cofig";

type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: async ({ token, newPassword }) => {
      const res = await fetch(`${APP_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Password reset failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
};
