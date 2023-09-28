import React from "react";

import Image from "next/image";
import img from "../../../assets/img-placehoder.png";
import adminImg from "../../../assets/admin.png";
import Link from "next/link";
import { BsXCircleFill } from "react-icons/bs";
import { ROLE } from "@prisma/client";
import useRoutes from "@/hooks/useRoutes";
import useAuth from "@/hooks/useAuth";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

export default function Sidebar({ open, toggle }: SidebarProps) {
  const { data } = useAuth();
  const pathname = usePathname();
  const routes = useRoutes();

  return (
    <>
      {data ? (
        <article
          className={`h-full border-r w-[300px] z-50 border-r-neutral-400 bg-white ${
            open && "absolute transition-all"
          }`}
        >
          <div className="w-full flex justify-center items-center relative p-3">
            <BsXCircleFill
              role="button"
              size={"1.3rem"}
              className="mdx:hidden absolute right-0 top-0 m-2 text-red-500"
              onClick={toggle}
            />
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="w-40 h-40">
                <Image
                  src={(data.role === "ADMIN" ? adminImg : data.image) || img}
                  alt={data?.first_name + "'s pic"}
                  height={1000}
                  width={1000}
                  className="rounded-full h-full w-full border shadow-lg"
                />
              </div>
              <div className="capitalize text-slate-700 text-2xl">
                {data?.role === "ADMIN"
                  ? "Admin"
                  : `${data?.first_name} ${data?.last_name}`}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            {data &&
              routes.map(({ href, icon: Icon, label, dashboard }, i) => {
                if (
                  label.toLowerCase() === "dashboard" &&
                  data?.role === ROLE.CUSTOMER
                ) {
                  return;
                }
                return (
                  <>
                    <Link
                      href={href}
                      key={i}
                      className={`${
                        pathname === href
                          ? "bg-red-400 text-white border-neutral-700"
                          : "bg-white text-black hover:text-red-400 transition"
                      } py-3 px-4 flex items-center gap-4`}
                    >
                      <Icon size={"1.2rem"} />
                      <span>{label}</span>
                    </Link>
                    {data?.role !== "CUSTOMER" && dashboard && (
                      <div className="w-full bg-white mt-2">
                        {dashboard.map(({ href, label, icon: Icon }) => (
                          <Link
                            href={href}
                            key={label}
                            className={`${
                              pathname === href
                                ? "border-l-red-400 text-red-400"
                                : "bg-white text-black hover:text-red-400 transition"
                            } py-2 px-4 flex items-center gap-4 ml-8 border-l-4`}
                          >
                            <Icon size={"1.2rem"} />
                            <span>{label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                );
              })}
          </div>
        </article>
      ) : (
        <SidebarSkeleton />
      )}
    </>
  );
}
