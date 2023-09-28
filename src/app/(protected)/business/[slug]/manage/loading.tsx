import React from "react";

export default function Loading() {
  return (
    <div className="w-full bg-neutral-200 min-h-full p-4 overflow-y-auto">
      <p className="my-4 py-4 rounded-md w-[30%] bg-neutral-500 animate-pulse" />
      <div className="w-full  grid grid-cols-1 md:grid-cols-2  gap-4">
        {Array.from({ length: 6 }).map((e, i) => (
          <p
            key={i}
            className="py-4 text-center animate-pulse bg-neutral-500 rounded-md my-3"
          />
        ))}
      </div>
      <div className="w-full md:w-[65%] mt-3">
        <div className="w-full border border-neutral-500 animate-pulse h-56 bg-neutral-500" />
        <p className="py-4 w-full rounded-lg my-4 animate-pulse bg-neutral-500"></p>
      </div>
      <p className="w-20 p-3 bg-neutral-500 animate-pulse my-4" />
    </div>
  );
}
