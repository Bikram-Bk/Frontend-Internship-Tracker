"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetDailyLogsRange } from "../api/log/use-log-range";
import { useGetGeminiSummary } from "../api/log/use-gemini-summery";

export default function SummaryPopup() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [open, setOpen] = useState(false);
  const [triggerSummary, setTriggerSummary] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: logsData, refetch: fetchLogs } = useGetDailyLogsRange(
    startDate,
    endDate
  );

  const content = logsData ? JSON.stringify(logsData.data, null, 2) : "";

  const { data: summaryData, isLoading: isSummaryLoading } =
    useGetGeminiSummary(content, triggerSummary && !!content);

  const handleGenerateClick = async () => {
    setTriggerSummary(false);
    await fetchLogs();
    setTriggerSummary(true);
    setOpen(true);
  };

  const handleCopy = async () => {
    if (summaryData?.data?.summary) {
      await navigator.clipboard.writeText(summaryData.data.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4 flex items-end gap-4">
        <div className="flex flex-col">
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate}
          />
        </div>

        <div className="flex flex-col">
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
          />
        </div>

        <Button className="whitespace-nowrap" onClick={handleGenerateClick}>
          Generate Summary
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild />
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Summary</DialogTitle>
          </DialogHeader>

          <div className="min-h-[150px] max-h-[400px] overflow-auto rounded bg-gray-100 p-4 text-sm whitespace-pre-wrap">
            {isSummaryLoading
              ? "Generating summary..."
              : summaryData?.success
              ? summaryData.data.summary
              : "No summary available."}
          </div>

          {summaryData?.success && (
            <Button onClick={handleCopy} className="mt-3 w-full">
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          )}

          <DialogClose asChild>
            <Button variant="outline" className="mt-3 w-full">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
