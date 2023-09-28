import React from "react";

export default function SidebarSkeleton() {
  return (
    <article className="overflow-y-auto border hidden md:block w-[300px] bg-neutral-200 animate-pulse mt-2 px-2">
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <p className="rounded-full h-40 w-40 bg-neutral-500 animate-pulse" />
        <p className="text-center bg-neutral-500 animate-pulse py-4 rounded-lg w-[60%]" />
      </div>
      <div className="flex flex-col gap-3 my-4 px-3 w-full">
        {Array.from({ length: 5 }).map((e, i) => (
          <p key={i} className="my-3 bg-neutral-500 py-4 w-full" />
        ))}
      </div>
    </article>
  );
}
