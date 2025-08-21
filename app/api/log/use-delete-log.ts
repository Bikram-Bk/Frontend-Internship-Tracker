import { APP_BASE_URL } from "@/app/utils/cofig";
import { fetchWithAuth } from "@/app/utils/fetch-with-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteLog = async (id: string) => {
  return fetchWithAuth(`${APP_BASE_URL}/api/log/${id}`, {
    method: "DELETE",
  });
};

export const useDeleteLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyLogs"] });
      toast.success("Log Deleted Successfully");
    },
  });
};
