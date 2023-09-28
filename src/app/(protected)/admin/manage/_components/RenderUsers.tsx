"use client";

import { TOAST_PROP } from "@/context/Provider";
import { apiClient } from "@/utils/axios";
import { ROLE } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FilterUsers from "./FilterUsers";
import UserCard from "./UserCard";

export interface RenderUsersProps {
  users: {
    id: number;
    role: ROLE;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    city: string;
    restaurant: {
      name: string;
      slug: string;
    } | null;
  }[];
}

export default function RenderUsers({ users: AllUsers }: RenderUsersProps) {
  const [users, setUsers] = useState(AllUsers);

  const router = useRouter();

  const handleRemoveUser = (id: number) => {
    const confirmed = confirm(
      "Are you sure want to remove this user?"
    ).valueOf();
    if (!confirmed) return;
    toast
      .promise(
        apiClient.delete(`/api/admin/manage/users/delete/${id}`),
        { pending: "Removing..." },
        TOAST_PROP
      )
      .then((res) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success(res.data.message, TOAST_PROP);
        router.refresh();
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to remove the user!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div className="overflow-y-auto">
      <FilterUsers AllUsers={AllUsers} setUsers={setUsers} />
      {users.length === 0 ? (
        <div className="grid place-items-center text-2xl font-semibold text-slate-700 mt-10 h-full">
          No Users!!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              handleRemoveUser={handleRemoveUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
