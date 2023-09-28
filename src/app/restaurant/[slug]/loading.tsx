import Image from "next/image";
import React from "react";
import Img from "../../../assets/img-placehoder.png";
export default function loading() {
  return (
    <div>
      <header className="h-1/2 md:h-[32rem] w-full animate-pulse">
        <Image
          src={Img}
          alt={"restaurant"}
          height={2000}
          width={2000}
          className="w-full h-full"
        />
      </header>
      <div className="w-[85%] m-auto flex flex-wrap justify-between -translate-y-14 h-full relative">
        <div className="bg-slate-200 w-full md:w-[65%] rounded-lg shadow-md px-5 py-1">
          {/* Navbar */}
          <div className="bg-slate-400 rounded-full animate-pulse" />
          <hr className="border border-gray-200" />

          <section id="overview" className="">
            {/* Title */}
            <h1 className="bg-slate-400 rounded-full h-7 my-3 animate-pulse" />
            <hr className="border border-gray-200" />

            {/* ratings */}
            <div className="bg-slate-400 rounded-full h-5 my-4 animate-pulse" />

            {/* description */}
            <div className="rounded-full flex flex-col justify-between gap-6">
              <p className="h-3 bg-slate-400 rounded-full w-full animate-pulse" />
              <p className="h-3 bg-slate-400 rounded-full w-full animate-pulse" />
              <p className="h-3 bg-slate-400 rounded-full w-full animate-pulse" />
            </div>

            {/* Images */}
            <div className="my-4">
              <hr className="border border-gray-200 mb-4" />
              <div className="flex items-center flex-wrap gap-3">
                {Array.from({ length: 5 }).map((a, index) => (
                  <Image
                    src={Img}
                    key={index}
                    alt={"image"}
                    width={1000}
                    height={1000}
                    className="w-44 h-36 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="menu">
            {/* Menu */}
            <div className="my-6">
              <h2 className="text-xl font-semibold capitalize mb-3 animate-pulse" />
              <hr className="bg-slate-400 py-3 mb-4" />
              <div className="flex flex-wrap gap-2 justify-between">
                {Array.from({ length: 5 }).map((a, index) => (
                  <div key={index} className="w-[47%]">
                    <p className="my-2 py-2 bg-slate-400 rounded-full animate-pulse w-full" />
                    <p className="my-2 py-2 bg-slate-400 rounded-full animate-pulse w-full" />
                    <p className="my-2 py-2 bg-slate-400 rounded-full animate-pulse w-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Reservation section */}
        {/* <div
          className="w-full md:w-[30%] rounded-lg shadow-md px-5 py-1 
        [&_label]:text-gray-600 [&_label]:font-semibold bg-slate-200"
        >
          <nav className="bg-slate-400 py-6 mt-2 animate-pulse" />
          <hr className="border border-gray-200" />

          <div className="my-4 bg-slate-400 py-4 rounded-md w-full animate-pulse" />
          <div className="my-4 bg-slate-400 py-4 rounded-md w-full animate-pulse" />
          <div className="my-4 bg-slate-400 py-4 rounded-md w-full animate-pulse" />
          <div className="my-5 bg-slate-400 py-5 w-full animate-pulse" />
        </div> */}

        <div
          className="w-full md:w-[30%] bg-white rounded-lg shadow-md px-5 py-1 
        [&_label]:text-gray-600 [&_label]:font-semibold"
        >
        </div>
      </div>
    </div>
  );
}
