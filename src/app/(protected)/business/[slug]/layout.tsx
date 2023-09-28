import React from "react";
import TabLinks from "../../_components/TabLinks";

export default async function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 w-full">
      <TabLinks />
      {children}
    </div>
  );
}
