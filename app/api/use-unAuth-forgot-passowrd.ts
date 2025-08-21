"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { APP_BASE_URL } from "../utils/cofig";

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export const useUnauthForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordRequest>({
    mutationFn: async ({ email }) => {
      const response = await fetch(`${APP_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to send reset email");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Reset email sent");
    },
    onError: (error) => {
      toast.error(error.message || "Unable to send reset email");
    },
  });
};
