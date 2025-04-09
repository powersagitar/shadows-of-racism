"use server";

import React, { Suspense } from "react";
import PageSkeleton from "./pageskeleton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}
