import React from "react";

export default function Loading() {
  return (
    <div className="w-full overflow-y-auto bg-neutral-100 animate-pulse py-2">
      <h1 className="h-16 w-72 bg-neutral-400 animate-pulse my-2" />
      <div className="flex w-full gap-2 justify-end items-center my-2">
        {Array.from({ length: 3 }).map((e, i) => (
          <p key={i} className="w-24 h-10 bg-neutral-400 animate-pulse" />
        ))}
      </div>
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 bg-neutral-200 animate-pulse my-2 overflow-y-auto">
        {Array.from({ length: 6 }).map((e, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 h-52 w-full bg-neutral-400 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
