"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DailyLogForm from "./daily-log-form";

export default function DailyLogPopup() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Daily Log</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Daily Log</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new daily log entry.
          </DialogDescription>
        </DialogHeader>

        <DailyLogForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
