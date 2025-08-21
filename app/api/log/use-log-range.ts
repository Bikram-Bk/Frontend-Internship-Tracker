"use client";

import { useQuery } from "@tanstack/react-query";
import { APP_BASE_URL } from "@/app/utils/cofig";
import { fetchWithAuth } from "@/app/utils/fetch-with-auth";

export interface DailyLog {
  id: string;
  date: string;
  type: string;
  task: string;
  details: string;
  hours: string;
}

export interface DailyLogsResponse {
  success: boolean;
  data: DailyLog[];
  message: string;
}

export const useGetDailyLogsRange = (startDate: string, endDate: string) => {
  return useQuery<DailyLogsResponse, Error>({
    queryKey: ["dailyLogsRange", startDate, endDate],
    queryFn: async () => {
      const url = new URL(`${APP_BASE_URL}/api/log/range`);
      url.searchParams.append("startDate", startDate);
      url.searchParams.append("endDate", endDate);

      const response = await fetchWithAuth(url.toString());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to fetch logs");
      }

      return response.json();
    },
  });
};
