import { PRICE } from "@prisma/client";
import React  from "react";

export default function Price({ price }: { price: PRICE }) {
  return (
    <>
      <div className="font-medium">
        {price === "CHEAP" && (
          <p>
            <span className="text-gray-700">₹₹</span>
            <span className="text-gray-300">₹₹</span>
          </p>
        )}
        {price === "REGULAR" && (
          <p>
            <span className="text-gray-700">₹₹₹</span>
            <span className="text-gray-300">₹</span>
          </p>
        )}
        {price === "EXPENSIVE" && (
          <p>
            <span className="text-gray-700">₹₹₹₹</span>
          </p>
        )}
      </div>
    </>
  );
}
