"use client";

import { useQuery } from "@tanstack/react-query";

import { APP_BASE_URL } from "../utils/cofig";
import { fetchWithAuth } from "../utils/fetch-with-auth";

type MeResponse = {
  success: boolean;
  data: {
    id: string;
    email: string;
    username: string;
    phone?: string | null;
    avatar?: string | null;
    role: "USER";
    createdAt: string;
    updatedAt: string;
  };
  message: string;
};

export const useMe = () => {
  return useQuery<MeResponse, Error>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await fetchWithAuth(`${APP_BASE_URL}/api/users/profile`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to fetch user data");
      }

      return response.json();
    },
  });
};
