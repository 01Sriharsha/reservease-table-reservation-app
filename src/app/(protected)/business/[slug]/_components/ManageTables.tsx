"use client";

import { TOAST_PROP } from "@/context/Provider";
import { apiClient } from "@/utils/axios";
import { Restaurant, Table } from "@prisma/client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface ManageTablesProps {
  restaurant:
    | (Restaurant & {
        tables: Table[];
      })
    | null;
}

export default function ManageTables({ restaurant }: ManageTablesProps) {
  const [tables, settables] = useState(restaurant?.tables);

  const [input, setInput] = useState({
    "2seat": "",
    "4seat": "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(
        apiClient.post(`/restaurant/${restaurant?.slug}/manage/tables/add`, {
          ...input,
        }),
        { pending: "Adding..." },
        TOAST_PROP
      )
      .then((res) => {
        settables((prev) => [...prev!, ...res.data.tables]);
        toast.success(res.data.message, TOAST_PROP);
        setInput({ "2seat": "", "4seat": "" });
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "failed to add table!!",
          TOAST_PROP
        );
      });
  };

  const handleDelete = (id: number) => {
    toast
      .promise(
        apiClient.delete(
          `/restaurant/${restaurant?.slug}/manage/tables/delete/${id}`
        ),
        { pending: "Removing..." },
        TOAST_PROP
      )
      .then((res) => {
        settables((prev) => prev?.filter((c) => c.id !== id));
        toast.success(res.data.message, TOAST_PROP);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "failed to remove table!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div className="w-full mt-2 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[75%] m-auto mt-4 px-1"
      >
        <h3 className="text-slate-600 text-xl mt-2">Add available tables: </h3>
        <div className="flex flex-col md:flex-row w-full justify-between gap-4 items-center">
          <div className="my-3 w-full">
            <label htmlFor="2seat">2 Seater</label>
            <input
              type="number"
              name="2seat"
              id="2seat"
              placeholder="Enter number of 2 seater tables"
              value={input["2seat"]}
              onChange={handleChange}
              className="p-2 w-full border border-neutral-300 hover:border-black transition my-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="my-3 w-full">
            <label htmlFor="4seat">4 Seater</label>
            <input
              type="number"
              name="4seat"
              id="4seat"
              placeholder="Enter number of 4 seater tables"
              value={input["4seat"]}
              onChange={handleChange}
              className="p-2 w-full border border-neutral-300 hover:border-black transition my-2 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-slate-700 text-white border hover:bg-white hover:text-black hover:border-black mb-3"
        >
          Save
        </button>
      </form>

      <div className="w-full md:w-[75%] m-auto mt-4">
        <h3 className="text-slate-600 text-xl my-2">All tables:</h3>
        {tables?.length === 0 ? (
          <h3 className="text-xl text-center font-bold text-slate-700 mt-8">
            No tables added!!
          </h3>
        ) : (
          <table className="p-2 text-center w-full">
            <tr className="">
              <th className="py-3 px-16">table Id</th>
              <th className="py-3 px-16">table Name</th>
              <th className="py-3 px-16">Action</th>
            </tr>
            <tbody>
              {tables?.map((table) => (
                <tr
                  key={table.id}
                  className="border-t border-t-black capitalize hover:bg-slate-100"
                >
                  <td className="py-3 px-16">{table.id}</td>
                  <td className="py-3 px-16">{table.seats}</td>
                  <td className="py-3 px-16 flex justify-center">
                    <AiFillDelete
                      role="button"
                      size={"1.3rem"}
                      color="red"
                      onClick={() => handleDelete(table.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
