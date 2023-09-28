"use client";

import useAvailabilities from "@/hooks/useAvailabilities";
import GenerateTimeStamp from "@/utils/GenerateTimeStamp";
import displayTime from "@/utils/DisplayTime";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { TOAST_PROP } from "@/context/Provider";
import DatePicker from "react-datepicker";
import { formatDate } from "@/utils/formatDate";
import useAuth from "@/hooks/useAuth";
import useSaveCurrentUrl from "@/hooks/useSaveCurrentUrl";

interface ReservationCardProp {
  openTime: string;
  closeTime: string;
  slug: string;
}

export default function ReservationCard({
  openTime,
  closeTime,
  slug,
}: ReservationCardProp) {
  const timeStamps = GenerateTimeStamp();

  const { authenticated } = useAuth();

  const { saveUrl } = useSaveCurrentUrl();

  const { loading, data, fetchAvailabilities } = useAvailabilities();

  const [input, setInput] = useState({
    partySize: "",
    date: "",
    time: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const validate = () => {
    if (!input.partySize || !input.date || !input.time) {
      toast.error("Select all fields!!", TOAST_PROP);
      return false;
    }
    return true;
  };

  const FilteredTimeStamps = () => {
    const times: typeof timeStamps = [];

    let flag = false;

    timeStamps.forEach((time) => {
      if (time.value === openTime?.substring(0, 5)) flag = true;

      if (flag) times.push(time);

      if (time.value === closeTime?.substring(0, 5)) flag = false;
    });

    return times;
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setInput((prev) => ({ ...prev, date: formatDate(date) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await fetchAvailabilities({ slug, ...input });
  };

  return (
    <aside>
      <nav className="text-center py-3">
        <h1 className="text-lg font-bold text-gray-700">Make a reservation</h1>
      </nav>
      <hr className="border border-gray-200" />

      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="size">Party Size</label>
          <br />
          <select
            name="partySize"
            id="partySize"
            value={input.partySize}
            onChange={handleChange}
            className="py-2 px-1 border-b border-b-gray-400 focus:outline-none w-full text-center"
          >
            <option hidden>--select party size--</option>
            {Array.from({ length: 10 }).map((e, i) => (
              <option key={i} value={i + 1}>
                {i + 1} person
              </option>
            ))}
          </select>
        </div>

        <div className="w-full my-4">
          <label htmlFor="date">Date</label>
          <br />
          <div className="flex justify-center w-full border-b border-b-gray-400 py-2">
            <DatePicker
              className="cursor-pointer text-center outline-none"
              placeholderText="--select date--"
              onChange={handleDateChange}
              minDate={new Date()} // Only allows present and future dates
              value={input.date}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="time">Time</label>
          <br />
          <select
            name="time"
            id="time"
            value={input.time}
            onChange={handleChange}
            className="text-center w-full focus:outline-none border-b border-b-gray-400 py-2 px-1"
          >
            <option hidden>--select time--</option>
            {FilteredTimeStamps().map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="w-full bg-red-500 text-white border border-white py-3 px-2 rounded-md"
          >
            {loading ? (
              <ClipLoader size={"1.1rem"} color="white" />
            ) : (
              "Find a time"
            )}
          </button>
        </div>
      </form>

      {data && (
        <time className="flex justify-between flex-wrap gap-1 my-2">
          {data.map((d, i) => {
            return d.available ? (
              <Link
                href={
                  authenticated
                    ? `/reserve/${slug}?date=${
                        input.date
                      }&time=${d.time.substring(0, 5)}&partySize=${
                        input.partySize
                      }`
                    : "/?login=true"
                }
                key={i}
                className={`py-2 px-2 rounded-md bg-red-500 text-white my-2`}
                onClick={() => !authenticated && saveUrl()}
              >
                {displayTime(d.time)}
              </Link>
            ) : (
              <p className={`py-2 px-2 rounded-md bg-gray-500 text-white my-2`}>
                {displayTime(d.time)}
              </p>
            );
          })}
        </time>
      )}
    </aside>
  );
}
