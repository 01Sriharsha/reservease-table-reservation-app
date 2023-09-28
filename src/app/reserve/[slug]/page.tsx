import Navbar from "@/components/Navbar";
import prisma from "@/lib/PrismaClient";
import displayTime from "@/utils/DisplayTime";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Form from "./components/Form";
import Header from "./components/Header";

export default async function Reservation({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; time: string; partySize: string };
}) {
  const { slug } = params;

  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) return notFound();

  return (
    <main className="w-full bg-blue-100 h-screen grid p-4 overflow-y-auto">
      <div className="w-full md:w-[60%] m-auto grid place-items-center p-4 border border-neutral-300 shadow-xl rounded-lg bg-white">
        {/* Header */}
        <header className="w-full">
          <Header restaurant={restaurant} searchParams={searchParams} />
        </header>

        {/* Form */}
        <div className="w-full">
          <Form
            slug={restaurant.slug}
            date={searchParams.date}
            time={searchParams.time}
            partySize={searchParams.partySize}
            ownerId={restaurant.ownerId}
          />
        </div>
      </div>
    </main>
  );
}
