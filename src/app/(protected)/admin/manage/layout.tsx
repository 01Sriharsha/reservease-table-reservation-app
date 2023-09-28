import React, { ReactNode } from "react";
import TabLinks from "../../_components/TabLinks";

export default function AdminManageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full overflow-y-auto h-full px-4">
      <TabLinks />
      {children}
    </div>
  );
}
