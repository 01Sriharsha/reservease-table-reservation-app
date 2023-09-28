import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SignOutModal from "./auth/SignOutModal";
import useRoutes from "@/hooks/useRoutes";
import useAuth from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { ROLE } from "@prisma/client";

const UserDropdown = () => {
  const { authenticated, data } = useAuth();

  const [clicked, setClicked] = useState(false);

  const routes = useRoutes();

  if (!data) {
    return <ClipLoader size={"1rem"} color="black" />;
  }
  return (
    <div className="relative flex flex-col items-end">
      <span
        role="button"
        className="uppercase text-white bg-slate-700 w-9 h-8 flex justify-center items-center rounded-full font-semibold "
        onClick={() => setClicked(!clicked)}
      >
        {authenticated && `${data?.first_name[0]}${data?.last_name[0]}`}
      </span>
      <div
        className={`w-[180px] absolute bg-white mt-14 flex flex-col ${
          clicked ? "block" : "hidden"
        }`}
        onMouseLeave={() => setClicked(false)}
      >
        {routes.map((route) => {
          if (
            data.role === ROLE.CUSTOMER &&
            route.label === "Dashboard"
          ) {
            return;
          }
          return (
            <Link
              href={route.href}
              key={route.label}
              className="p-2 hover:bg-neutral-400 text-slate-700"
            >
              {route.label}
            </Link>
          );
        })}
        <SignOutModal />
      </div>
    </div>
  );
};

export default UserDropdown;
