import { ROLE } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa6";

interface UserCardProps {
  user: {
    id: number;
    role: ROLE;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    city: string;
    restaurant?: {
      name?: string;
      slug?: string;
    } | null;
  };
  handleRemoveUser?: (id: number) => void;
}

export default function UserCard({ user, handleRemoveUser }: UserCardProps) {
  return (
    <div
      key={user.id}
      className="bg-white p-4 rounded shadow-lg flex flex-col border border-neutral-200 shadow-black/20 my-2"
    >
      <div className="flex gap-4 items-center">
        <h2 className="text-xl font-semibold mb-2 capitalize">
          {user.first_name + " " + user.last_name}
        </h2>
        {user.restaurant && (
          <Link
            href={`/restaurant/${user?.restaurant?.slug}`}
            className="col-span-4 hover:underline text-md  text-slate-600 mb-1"
          >
            [<span className="px-1">{user?.restaurant?.name || ""}</span>]
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-gray-600 grid grid-cols-5">
          <span className="col-span-1">Email: </span>
          <span className="col-span-4">{user.email}</span>
        </p>
        <p className="text-gray-600 grid grid-cols-5">
          <span className="col-span-1">Phone: </span>
          <span className="col-span-4">{user.phone}</span>
        </p>
        <p className="text-gray-600 grid grid-cols-5">
          <span className="col-span-1">City: </span>
          <span className="col-span-4">{user.city}</span>
        </p>
        <p className="text-gray-600 grid grid-cols-5">
          <span className="col-span-1">Role: </span>
          <span className="col-span-4">{user.role}</span>
        </p>
      </div>
      <button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full self-end"
        onClick={() => handleRemoveUser && handleRemoveUser(user.id)}
      >
        <FaTrash size={"1rem"} className="" />
      </button>
    </div>
  );
}
