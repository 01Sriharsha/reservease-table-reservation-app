"use client"; // Error components must be Client Components

import { useEffect } from "react";
import img from "./favicon.ico";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center flex-col gap-4 h-[80vh]">
      <Image
        src={img}
        alt="error"
        width={1000}
        height={1000}
        className="w-56 h-56 rounded-full"
      />
      <h2 className="text-2xl font-bold capitalize">
        {/* {error.message ? error.message : "Something went wrong!!"} */}
        Something went wrong!!
      </h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
}
