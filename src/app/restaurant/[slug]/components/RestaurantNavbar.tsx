"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function RestaurantNavbar({ slug }: { slug: string }) {
  const [isSticky, setIsSticky] = useState(false);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > (ref.current?.offsetTop || 0)) {
        setIsSticky(true);
      } else setIsSticky(false);
    });
  }, []);
  

  return (
    <nav
      ref={ref}
      className={`flex items-center justify-start gap-12 [&>a]:border-b-2 [&>a]:border-b-transparent [&>a:hover]:text-red-500 [&>a:hover]:border-b-red-500 [&>a]:py-3`}
    >
      <Link href={`/restaurant/${slug}/#overview`}>Overview</Link>
      <Link href={`/restaurant/${slug}/#menu`}>Menu</Link>
      <Link href={`/restaurant/${slug}/#reviews`}>Reviews</Link>
    </nav>
  );
}
