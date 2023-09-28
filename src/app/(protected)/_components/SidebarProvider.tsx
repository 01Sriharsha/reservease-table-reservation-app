"use client";

import React, { Suspense, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const renderSidebar = () => {
    return (
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar open={open} toggle={toggle} />
      </Suspense>
    );
  };

  return (
    <>
      {open ? (
        <div className="flex relative overflow-y-auto">
          {renderSidebar()}
          <div>{children}</div>
        </div>
      ) : (
        <div className={`flex flex-col sm:flex-col mdx:flex-row`}>
          <div className={`px-5 py-3 w-full bg-slate-600 mdx:hidden`}>
            <AiOutlineMenu
              role="button"
              color="white"
              size={"1.5rem"}
              onClick={toggle}
            />
          </div>
          <div className="hidden mdx:block">{renderSidebar()}</div>
          <div className="w-full">{children}</div>
        </div>
      )}
    </>
  );
}
