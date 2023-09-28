"use client";

import { TOAST_PROP } from "@/context/Provider";
import useAuth from "@/hooks/useAuth";
import useSaveCurrentUrl from "@/hooks/useSaveCurrentUrl";
import { apiClient } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface FormProps {
  slug: string;
  date: string;
  time: string;
  partySize: string;
  ownerId: number;
}

export default function Form({
  slug,
  date,
  time,
  partySize,
  ownerId,
}: FormProps) {
  const { data } = useAuth();

  const router = useRouter();

  const { saveUrl } = useSaveCurrentUrl();

  const [input, setInput] = useState({
    occassion: "",
    request: "",
  });

  const [other, setOther] = useState(false);

  const occassions = ["Anniversary", "Birthday", "Buisness Meal", "Date Night"];

  const handlechange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) {
      toast.info("Sign In to continue with the reservation!!", TOAST_PROP);
      router.push("/?login=true");
      saveUrl();
      return;
    }
    if (data.id === ownerId) {
      toast.error("You cannot reserve your own restaurant!!", TOAST_PROP);
      return;
    }
    toast
      .promise(
        apiClient.post(
          `/restaurant/${slug}/reserve/${data.id}?date=${date}&time=${time}&partySize=${partySize}`,
          { ...input }
        ),
        { pending: "Booking..." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        setTimeout(() => {
          router.replace(`/user/@${data.first_name}/bookings`);
        }, 1000);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to reserve table",
          TOAST_PROP
        );
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        {other ? (
          <input
            type="text"
            name="occassion"
            onChange={handlechange}
            value={input.occassion}
            placeholder="Enter occassion..."
            className="border border-gray-300 rounded-md focus:outline-none focus:border-black py-3 px-3 w-full mt-2 hover:border hover:border-black hover:text-black"
          />
        ) : (
          <select
            className={`border border-gray-300 rounded-md focus:outline-none focus:border-black py-3 px-3 w-full my-2 hover:border hover:border-black hover:text-black text-center text-gray-400 focus:text-black ${
              input.occassion.length !== 0 && "text-black"
            }`}
            name="occassion"
            onChange={handlechange}
            value={input.occassion}
          >
            <option hidden>--select an occassion--</option>
            {occassions.map((occassion, i) => (
              <option key={i} value={occassion}>
                {occassion}
              </option>
            ))}
          </select>
        )}

        <div className="mb-2 pl-1 w-full flex items-center gap-1">
          <input id="other" type="checkbox" onChange={() => setOther(!other)} />
          <label htmlFor="other" className="text-sm text-gray-600">
            check here to enter other occassions
          </label>
        </div>

        <textarea
          placeholder="Add special request(optional)"
          className="border border-gray-300 rounded-md focus:outline-none focus:border-black py-3 px-3 w-full my-2 hover:border hover:border-black hover:text-black"
          name="request"
          onChange={handlechange}
          value={input.request}
        />
      </div>

      <button
        type="submit"
        className="bg-red-500 mt-3 py-3 w-full text-white text-center rounded-sm"
      >
        Complete Reservation
      </button>
      <p className="mt-3 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy.
      </p>
    </form>
  );
}
