import { Metadata } from "next";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
