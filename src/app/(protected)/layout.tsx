import React from "react";
import SidebarProvider from "./_components/SidebarProvider";

interface LayoutProp {
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: LayoutProp) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
