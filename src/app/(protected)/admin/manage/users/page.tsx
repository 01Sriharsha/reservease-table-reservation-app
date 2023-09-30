import prisma from "@/lib/PrismaClient";
import React from "react";
import RenderUsers from "../_components/RenderUsers";

export default async function ManageUsersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      phone: true,
      city: true,
      role: true,
      first_name: true,
      last_name: true,
      restaurant: { select: { name: true, slug: true } },
    },
  });

  if (!users) {
    return (
      <div className="text-2xl text-slate-800 font-bold mt-10 grid place-items-center">
        No Users!!
      </div>
    );
  }

  return (
    <div className="w-full p-2 overflow-y-auto ">
      <h1 className="text-3xl text-slate-800 font-semibold my-2">
        Manage Users:{" "}
      </h1>
      <RenderUsers users={users} />
    </div>
  );
}
