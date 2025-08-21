"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { APP_BASE_URL } from "../utils/cofig";

type RequestType = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
    user: {
      id: string;
      email: string;
      username: string;
      role: "USER";
      phone?: string | null;
      avatar?: string | null;
      createdAt?: string;
      updatedAt?: string;
    };
  };
  message: string;
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<LoginResponse, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await fetch(`${APP_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.error || errorData?.message || "Login failed"
        );
      }

      const result: LoginResponse = await response.json();

      if (!result.data?.accessToken) {
        throw new Error("Invalid login response: Missing accessToken");
      }

      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);

      console.log("loginResults", result);
      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Logged in");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to log in");
    },
  });

  return mutation;
};
