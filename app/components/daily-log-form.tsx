"use client";

import React, { useState } from "react";
import { DailyLogInput, useUpdateDailyLog } from "../api/log/use-log";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

export default function DailyLogForm({ onClose }: Props) {
  const { mutate, isPending } = useUpdateDailyLog();

  const [form, setForm] = useState<DailyLogInput>({
    date: new Date().toISOString().split("T")[0],
    type: "work",
    task: "",
    details: "",
    hours: "0",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Log Added Successfully");
        onClose();
      },
      onError: () => toast.error("Failed to update Daily Log"),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="date" className="block mb-1 font-medium">
          Date
        </label>
        <Input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block mb-1 font-medium">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          required>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="task" className="block mb-1 font-medium">
          Task
        </label>
        <Input
          id="task"
          name="task"
          type="text"
          value={form.task}
          onChange={handleChange}
          placeholder="Task description"
          required
        />
      </div>

      <div>
        <label htmlFor="details" className="block mb-1 font-medium">
          Details
        </label>
        <Textarea
          id="details"
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Additional details"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="hours" className="block mb-1 font-medium">
          Hours
        </label>
        <Input
          id="hours"
          name="hours"
          type="text"
          value={form.hours}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Log"}
        </Button>
      </div>
    </form>
  );
}
