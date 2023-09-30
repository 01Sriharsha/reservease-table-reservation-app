"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import AuthModal from "./auth/AuthModal";
import useAuth from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { ROLE } from "@prisma/client";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";
import SignOutModal from "./auth/SignOutModal";
import Logo from "../app/favicon.ico";

export default function Navbar() {
  const { loading, data, authenticated } = useAuth();

  const pathname = usePathname();

  return (
    <nav
      className={`py-3 px-4 fixed bg-white top-0 left-0 right-0 h-16 z-50 w-full m-auto border-b border-b-neutral-400 ${
        pathname.includes("/user/@") && "border-b border-b-neutral-400"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-1">
            <Image
              src={Logo}
              alt="logo"
              width={1000}
              height={1000}
              className="w-7 h-7 rounded-full"
            />
            <Link href="/" className="text-2xl text-gray-700 font-bold">
              ReservEase
            </Link>
          </div>
          {(!data || data?.role === ROLE.CUSTOMER) && (
            <Link href="/business" className="text-slate-700 font-medium mt-1">
              Business
            </Link>
          )}
        </div>
        <div className="flex gap-4 items-center">
          {loading ? (
            <div className="flex items-center justify-center md:mr-4">
              <ClipLoader color="black" size={"1.5rem"} />
            </div>
          ) : authenticated ? (
            <div className="flex gap-4 items-center">
              {data?.role === ROLE.ADMIN ? (
                <>
                  <Link href="/admin/manage" className="hover:text-red-400">
                    Dashboard
                  </Link>
                  <SignOutModal />
                </>
              ) : (
                <UserDropdown />
              )}
            </div>
          ) : (
            <>
              {pathname === "/" ? (
                <AuthModal />
              ) : (
                <Link
                  href={"/?login=true"}
                  className={`px-4 py-2 rounded-md border bg-btn text-white`}
                >
                  Sign In
                </Link>
              )}
              <Link
                href={"/signup"}
                className={`px-4 py-2 rounded-md border bg-white text-slate-800 border-black hidden md:block`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
