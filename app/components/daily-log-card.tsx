"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import { useDeleteLog } from "../api/log/use-delete-log";

export interface DailyLog {
  id: string;
  date: string;
  type: string;
  task: string;
  details: string;
  hours: string;
}

interface DailyLogCardProps {
  log: DailyLog;
}

export default function DailyLogCard({ log }: DailyLogCardProps) {
  const { mutate: deleteLog } = useDeleteLog();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{new Date(log.date).toLocaleDateString()}</CardTitle>
        <CardDescription>{log.type}</CardDescription>
      </CardHeader>
      <CardContent className=" flex justify-between items-center group cursor-pointer gap-x-5 ">
        <div>
          <p>
            <strong>Task:</strong> {log.task}
          </p>
          <p>
            <strong>Details:</strong> {log.details}
          </p>
          <p>
            <strong>Hours:</strong> {log.hours}
          </p>
        </div>
        <button
          onClick={() => deleteLog(log.id)}
          className=" group group-hover:opacity-100 opacity-0">
          <Trash2Icon size={24} className=" text-red-500" />
        </button>
      </CardContent>
    </Card>
  );
}
