import Image from "next/image";
import React from "react";
import Img from "../../assets/img-placehoder.png";
import Search from "@/components/Search";

export default function Loading() {
  return (
    <>
      <header className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
        <div className="flex justify-center items-center flex-col h-full gap-6">
          <h1 className="text-3xl text-center md:text-[2.5rem] font-bold text-white capitalize">
            Find your table for any occassion
          </h1>
          <Search />
        </div>
      </header>

      <main className="my-8 px-20 flex flex-wrap justify-center md:justify-between gap-6">
        {Array.from({ length: 10 }).map((a, index) => (
          <div key={index}>
            <Image
              src={Img}
              alt="image"
              height={1000}
              width={1000}
              className="w-full h-44 animate-pulse"
            />
            <div className="flex flex-col p-3 border gap-4">
              <div className="py-2 rounded-full bg-slate-400  animate-pulse" />
              <div className="py-2 rounded-full bg-slate-400 animate-pulse" />
              <div className="py-2 rounded-full bg-slate-400 animate-pulse" />
              <div className="py-2 rounded-full bg-slate-400 animate-pulse" />
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
