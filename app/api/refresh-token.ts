"use client";

import { useMutation } from "@tanstack/react-query";
import { APP_BASE_URL } from "../utils/cofig";

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  message?: string;
};

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, Error>({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const res = await fetch(`${APP_BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to refresh token");
      }

      return res.json();
    },
  });
};
