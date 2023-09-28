"use client";

import TabSkeleton from "@/app/(protected)/_components/skeletons/TabSkeleton";
import useAuth from "@/hooks/useAuth";
import useRoutes from "@/hooks/useRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TabLinks() {
  const pathname = usePathname();

  const { data } = useAuth();

  const routes = useRoutes();

  return (
    <>
      {data ? (
        <div className="hidden md:flex gap-4 items-center w-full flex-wrap">
          {routes.map(({ href, label, dashboard }) => {
            if (
              label.toLowerCase() === "profile" ||
              label.toLowerCase() === "bookings"
            ) {
              return;
            }
            return (
              <>
                <Link
                  href={href}
                  key={label}
                  className={`text-lg font-bold border-b-2 p-3 hover:text-slate-700 ${
                    pathname === href
                      ? "border-b-black text-slate-700"
                      : "text-neutral-500"
                  }`}
                >
                  {label}
                </Link>
                {dashboard &&
                  dashboard.map(({ href, label }) => (
                    <Link
                      href={href}
                      key={label}
                      className={`text-lg font-bold border-b-2 p-3 hover:text-slate-700 ${
                        pathname === href
                          ? "border-b-black text-slate-700"
                          : "text-neutral-500"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
              </>
            );
          })}
        </div>
      ) : (
        <TabSkeleton />
      )}
    </>
  );
}
