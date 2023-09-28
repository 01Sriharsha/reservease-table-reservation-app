import React from "react";
import prisma from "@/lib/PrismaClient";
import UserDetails from "./components/UserDetails";
import ChangePassword from "./components/ChangePassword";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  //"%40" is "@" in server components
  const username = params.username.split("%40")[1];

  const user = await prisma.user.findFirst({
    where: { first_name: username.toLowerCase() },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      password: true,
      email: true,
      phone: true,
      city: true,
      image: true,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  return (
    <div className="w-full">
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="mt-2">Add information about yourself!</p>
      </div>
      <div className="border border-neutral-400 border-x-0">
        <UserDetails user={user} />
      </div>
      <ChangePassword user={user} />
    </div>
  );
}
