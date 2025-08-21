"use client";

import React from "react";
import AuthProtectedLayout from "../wrappers/auth-layout-wrapper";
import DailyLogPopup from "../components/daily-log-popup";
import { useGetDailyLogs } from "../api/log/use-get-logs";
import DailyLogCard, { DailyLog } from "../components/daily-log-card";
import SummaryPopup from "../components/summary-popup";

function Page() {
  const { data: logs, isLoading, isError, error, refetch } = useGetDailyLogs();

  return (
    <AuthProtectedLayout>
      <main className="logbook-page min-h-screen container mx-auto">
        <div className=" flex  justify-end items-center space-x-20">
          <SummaryPopup />
          <DailyLogPopup />
        </div>

        {logs?.data.length === 0 && (
          <div className=" flex text-3xl items-center mt-[120px] font-semibold justify-center">
            No Logs Yet
          </div>
        )}
        <div className="gap-4 mt-10 flex flex-wrap justify-center">
          {logs?.data.map((log: DailyLog) => (
            <div key={log.id} className="min-w-[350px]">
              <DailyLogCard log={log} />
            </div>
          ))}
        </div>
      </main>
    </AuthProtectedLayout>
  );
}

export default Page;
