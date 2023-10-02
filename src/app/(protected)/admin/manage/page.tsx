import prisma from "@/lib/PrismaClient";
import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

export default async function AdminManagePage() {
  const restaurants = await prisma.restaurant.findMany({
    select: { name: true, slug: true },
  });
  const users = await prisma.user.findMany({
    select: { first_name: true, last_name: true },
  });

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-slate-800">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Restaurant List */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-300">Restaurant List</h2>
            <div className="p-2">
              {restaurants.map((restaurant) => (
                <>
                  <Link
                    href={`/restaurant/${restaurant.slug}`}
                    key={restaurant.slug}
                    className="py-2 w-full capitalize hover:text-red-400 hover:underline flex items-center gap-1"
                  >
                    <BsArrowRightShort />
                    <span>{restaurant.name}</span>
                  </Link>
                </>
              ))}
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-300">Users List</h2>
            <div className="p-2">
              {users.map((user, i) => (
                <p key={i} className="py-2 capitalize flex items-center gap-1">
                  <BsArrowRightShort />
                  <span>{user.first_name + " " + user.last_name}</span>
                </p>
              ))}
            </div>
            <div className="w-full flex justify-end mt-3 mb-1">
              <Link
                href={`/admin/manage/users`}
                className="px-4 py-2 bg-blue-300 text-white"
              >
                Manage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
