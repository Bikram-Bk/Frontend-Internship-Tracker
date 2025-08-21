"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";

interface Props {
  children: React.ReactNode;
}

export default function AuthProtectedLayout({ children }: Props) {
  const { authenticated, loading } = useAuth();

  console.log("Wrapper", authenticated);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      const timer = setTimeout(() => router.push("/login"), 100);
      return () => clearTimeout(timer);
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
