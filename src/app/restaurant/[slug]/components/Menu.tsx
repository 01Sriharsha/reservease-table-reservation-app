import { Item } from "@prisma/client";
import React from "react";

export default function Menu({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between gap-2 w-full my-1 shadow-sm rounded-md border border-neutral-300 p-2"
        >
          <div className="flex justify-between items-center text-md font-medium text-gray-700 m-0">
            <h4>{item.name}</h4>
            <span>₹{item.price}</span>
          </div>
          <hr />
          <p className="font-normal text-sm text-gray-600 m-0">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
