"use client";

import React, { useState } from "react";
import img from "../../assets/bg.jpg";
import Image from "next/image";

import useAuth from "@/hooks/useAuth";
import BusinessRequestForm from "./components/BusinessRequestForm";
import { useRouter } from "next/navigation";
import useSaveCurrentUrl from "@/hooks/useSaveCurrentUrl";

export default function BusinessLandingPage() {
  const { data } = useAuth();

  const router = useRouter();

  const { saveUrl } = useSaveCurrentUrl();

  const [clicked, setClicked] = useState(false);

  const handleRoute = () => {
    setClicked(true);
    if (data) {
      setClicked(true);
      router.push("/business#info");
    } else {
      setClicked(false);
      saveUrl();
      router.push("/?login=true");
    }
  };

  return (
    <div className="bg-business min-h-screen">
      <section className="flex h-screen md:h-full">
        <div className="text-white w-full md:w-[35%] flex justify-center items-center flex-col gap-4 font-bold tracking-in-expand">
          <h1 className="text-4xl font-semibold">Join OpenTable Now!!</h1>
          <p className="mt-2 text-md">Grow your restaurant business with us.</p>
          <span
            role="button"
            // href={data ? "/business#info" : "/?login=true"}
            className="px-3 py-2 bg-slate-700 text-white rounded-sm"
            onClick={handleRoute}
          >
            Get Started
          </span>
        </div>
        <Image
          src={img}
          alt="Restaurant"
          className="h-screen object-cover w-[65%] hidden md:block"
        />
      </section>

      <section id="info" className={clicked ? "block" : "hidden"}>
        <BusinessRequestForm />
      </section>
    </div>
  );
}
