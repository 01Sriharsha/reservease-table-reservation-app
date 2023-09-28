"use client";

import { TOAST_PROP } from "@/context/Provider";
import { apiClient } from "@/utils/axios";
import { Location } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Renderlocations({
  locations: Alllocations,
}: {
  locations: Location[];
}) {
  const [locations, setlocations] = useState(Alllocations);

  const [location, setlocation] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(
        apiClient.post(`/admin/manage/location/add`, { name: location.toLowerCase() }),
        { pending: "Adding..." },
        TOAST_PROP
      )
      .then((res) => {
        setlocations((prev) => [...prev, res.data.location]);
        toast.success(res.data.message, TOAST_PROP);
        setlocation("");
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "failed to add location!!",
          TOAST_PROP
        );
      });
  };

  const handleDelete = (id: number) => {
    toast
      .promise(
        apiClient.delete(`/admin/manage/location/delete/${id}`),
        { pending: "Removing..." },
        TOAST_PROP
      )
      .then((res) => {
        setlocations((prev) => prev.filter((c) => c.id !== id));
        toast.success(res.data.message, TOAST_PROP);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "failed to remove location!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div className="w-full mt-2">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[75%] m-auto mt-4 px-1"
      >
        <h3 className="text-slate-600 text-xl mt-2">Add a location:</h3>
        <input
          type="text"
          placeholder="Enter location name"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          className="p-2 w-full border border-neutral-300 hover:border-black transition my-3 focus:outline-none rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-slate-700 text-white border hover:bg-white hover:text-black hover:border-black my-3"
        >
          Save
        </button>
      </form>

      <div className="w-full md:w-[75%] m-auto mt-4">
        <h3 className="text-slate-600 text-xl my-2">All locations:</h3>
        <table className="p-2 text-center w-full">
          <tr className="">
            <th className="py-3 px-16">Location Id</th>
            <th className="py-3 px-16">Location Name</th>
            <th className="py-3 px-16">Action</th>
          </tr>
          <tbody>
            {locations.map((location) => (
              <tr
                key={location.id}
                className="border-t border-t-black capitalize hover:bg-slate-100"
              >
                <td className="py-3 px-16">{location.id}</td>
                <td className="py-3 px-16">{location.name}</td>
                <td className="py-3 px-16 flex justify-center">
                  <AiFillDelete
                    role="button"
                    size={"1.3rem"}
                    color="red"
                    onClick={() => handleDelete(location.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
