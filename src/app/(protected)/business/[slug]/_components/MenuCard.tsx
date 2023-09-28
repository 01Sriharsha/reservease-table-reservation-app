import { Item, ROLE } from "@prisma/client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { SignUpData } from "../../../../../../types";

export default function MenuCard({
  item,
  handleDeleteItem,
  data,
}: {
  item: Item;
  handleDeleteItem: (id: number) => void;
  data?: SignUpData;
}) {
  return (
    <div className="flex flex-col justify-between gap-2 w-full my-1 shadow-sm rounded-md border border-neutral-300 p-2">
      <div className="flex justify-between items-center text-md font-medium text-gray-700 m-0">
        <h4>{item.name}</h4>
        <span>₹{item.price}</span>
      </div>
      <hr />
      <p className="font-normal text-sm text-gray-600 m-0">
        {item.description}
      </p>
      <div className="flex justify-end items-center">
        {data?.role === ROLE.OWNER && (
          <AiFillDelete
            role="button"
            size={"1.1rem"}
            color="red"
            onClick={() => handleDeleteItem(item.id)}
          />
        )}
      </div>
    </div>
  );
}
