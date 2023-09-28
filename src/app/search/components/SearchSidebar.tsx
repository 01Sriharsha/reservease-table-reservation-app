"use client";

import React, { useState } from "react";
import Filter, { FilterProp } from "./Filter";
import { BsFilterLeft, BsXCircleFill } from "react-icons/bs";

export default function SearchSidebar({
  locations,
  cuisines,
  searchParams,
}: FilterProp) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`w-full pt-2 px-1`}>
        {open ? (
          <div className="w-[250px] flex justify-end">
            <BsXCircleFill
              role="button"
              size={"1.2rem"}
              color="red"
              className="mr-3"
              onClick={() => setOpen(false)}
            />
          </div>
        ) : (
          <div
            role="button"
            className="flex items-center gap-1 text-slate-800"
            onClick={() => setOpen(true)}
          >
            <BsFilterLeft
              size={"1.5rem"}
              color="black"
              className={`${open ? "hidden" : "block"}`}
            />
            <span className={`${open ? "text-white" : "text-black"}`}>
              Filter
            </span>
          </div>
        )}
      </div>
      <div
        className={`${
          open ? "w-[250px]" : "w-0"
        } block bg-white md:hidden absolute left-0 z-50 transition-all duration-75 h-screen overflow-y-scroll`}
      >
        <div className={`${open ? "block" : "hidden"}`}>
          <Filter
            locations={locations}
            cuisines={cuisines}
            searchParams={searchParams}
          />
        </div>
      </div>
    </>
  );
}
