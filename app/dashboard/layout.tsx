import React, { Suspense } from "react";
import PageSkeleton from "./pageskeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}
