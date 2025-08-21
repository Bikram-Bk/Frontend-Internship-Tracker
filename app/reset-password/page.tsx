"use client";

import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading reset password page...
        </div>
      }>
      <ResetPasswordForm />
    </Suspense>
  );
}
