"use client";

import { useQuery } from "@tanstack/react-query";
import { APP_BASE_URL } from "@/app/utils/cofig";
import { fetchWithAuth } from "@/app/utils/fetch-with-auth";

export interface GeminiSummaryResponse {
  success: boolean;
  data: {
    userId: string;
    summary: string;
  };
  message: string;
}

export const useGetGeminiSummary = (content: string, enabled: boolean) => {
  return useQuery<GeminiSummaryResponse, Error>({
    queryKey: ["geminiSummary", content],
    queryFn: async () => {
      const response = await fetchWithAuth(`${APP_BASE_URL}/api/gemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to get Gemini summary");
      }

      return response.json();
    },
  });
};
