"use client";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Providers(props: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <SpeedInsights />
      {props.children}
    </QueryClientProvider>
  );
}
