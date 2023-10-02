import prisma from "@/lib/PrismaClient";
import React, { Suspense } from "react";
import RenderBusinessRequests from "../_components/RenderBusinessRequests";

export default async function ManageBusinessRequests() {
  const requests = await prisma.businessRequest.findMany({
    include: {
      user: {
        select: { email: true, first_name: true, last_name: true, role: true },
      },
    },
  });

  if (!requests) {
    return (
      <div className="text-2xl text-slate-700 font-bold mt-32 grid place-items-center">
        Failed to load requests!!
      </div>
    );
  }
  return (
    <div className="w-full p-2">
      <h1 className="text-3xl text-slate-800 font-semibold my-2">
        Manage Requests
      </h1>
      <Suspense fallback={<h2>Fallback</h2>}>
        <RenderBusinessRequests requests={requests} />
      </Suspense>
    </div>
  );
}
