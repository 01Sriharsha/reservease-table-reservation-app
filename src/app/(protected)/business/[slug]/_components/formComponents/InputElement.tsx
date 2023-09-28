import useAuth from "@/hooks/useAuth";
import { ROLE } from "@prisma/client";
import React, { ChangeEvent } from "react";

const InputElement = ({
  name,
  value,
  type,
  handleChange,
}: {
  name: string;
  value: string;
  type: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}) => {
  const { data } = useAuth();

  const isOwner = data?.role === ROLE.OWNER;

  return (
    <div className="flex flex-col" style={{ margin: 0 }}>
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={name.includes("name") && isOwner}
        className={`border border-neutral-400 hover:border-black focus:outline-none p-2 mt-2 w-full ${
          name.includes("name") &&
          isOwner &&
          "cursor-not-allowed bg-neutral-200"
        }`}
      />
    </div>
  );
};

export default InputElement;
