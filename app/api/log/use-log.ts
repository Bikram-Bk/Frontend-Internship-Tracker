"use client";

import { APP_BASE_URL } from "@/app/utils/cofig";
import { fetchWithAuth } from "@/app/utils/fetch-with-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface DailyLogInput {
  date: string; // e.g. "2025-07-18"
  type: string; // e.g. "work"
  task: string;
  details: string;
  hours: string;
}

export interface DailyLogResponse {
  success: boolean;
  data: {
    id: string;
    date: string;
    type: string;
    task: string;
    details: string;
    hours: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export const useUpdateDailyLog = () => {
  const queryClient = useQueryClient();

  return useMutation<DailyLogResponse, Error, DailyLogInput>({
    mutationFn: async (logData) => {
      const response = await fetchWithAuth(`${APP_BASE_URL}/api/log`, {
        method: "PUT",
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to update daily log");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate dailyLogs query to refetch fresh data after mutation
      queryClient.invalidateQueries({ queryKey: ["dailyLogs"] });
    },
  });
};
