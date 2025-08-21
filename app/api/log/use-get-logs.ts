// api/log/useGetDailyLogs.ts
import { APP_BASE_URL } from "@/app/utils/cofig";
import { fetchWithAuth } from "@/app/utils/fetch-with-auth";
import { useQuery } from "@tanstack/react-query";

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

export const useGetDailyLogs = () => {
  return useQuery<DailyLogsResponse, Error>({
    queryKey: ["dailyLogs"],
    queryFn: async () => {
      const response = await fetchWithAuth(`${APP_BASE_URL}/api/logs`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to fetch daily logs");
      }

      return response.json();
    },
  });
};
