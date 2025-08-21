"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { APP_BASE_URL } from "../utils/cofig";

type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  data: {
    id: string;
    email: string;
    username: string;
    phone: string | null;
    avatar: string | null;
    role: "USER";
    createdAt: string;
    updatedAt: string;
  };
  message: string;
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (data) => {
      const res = await fetch(`${APP_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log("results", result);

      if (!res.ok) {
        throw new Error(
          result?.error || result?.message || "Registration failed"
        );
      }

      return result;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Registered successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.push("/login");
    },

    onError: (error) => {
      console.error("Register error:", error);
      toast.error(error.message || "Failed to register");
    },
  });

  return mutation;
};
