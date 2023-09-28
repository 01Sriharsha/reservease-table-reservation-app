"use client";

import { Location } from "@prisma/client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, MouseEvent, useEffect, ChangeEvent } from "react";

export default function Search({
  locations: AllLocations,
}: {
  locations?: Location[];
}) {
  const router = useRouter();

  const pathname = usePathname();

  const params = useSearchParams();

  const [changing, setChanging] = useState(false);

  const [location, setLoaction] = useState("");

  const isSearchPage = pathname.includes("/search");

  useEffect(() => {
    isSearchPage && setLoaction(params.get("city") || "");
  }, [isSearchPage, params]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoaction(e.target.value);
    setChanging(true);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    location && router.push(`/search?city=${location.toLowerCase()}`);
    setLoaction("");
  };

  return (
    <form className="flex items-center gap-2 justify-center px-4 w-full">
      <div className="w-[65%] md:w-1/3 relative">
        <input
          type="text"
          className="py-2 px-3 w-full rounded-md focus:outline-none font-medium text-gray-700"
          placeholder="Search by any city here..."
          value={location}
          onChange={handleChange}
        />
        {changing && location && (
          <div className="absolute mt-4 w-full bg-white flex flex-col gap-2 rounded-md">
            {AllLocations?.filter((loc) =>
              loc.name.toLowerCase().includes(location)
            )?.map((l) => (
              <Link
                href={`/search?city=${l.name.toLowerCase()}`}
                key={l.id}
                className="p-2 text-black hover:bg-neutral-300 capitalize rounded-md"
              >
                {l.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-red-500 text-white rounded-md"
        onClick={handleSearch}
      >
        {"Let's Go"}
      </button>
    </form>
  );
}
