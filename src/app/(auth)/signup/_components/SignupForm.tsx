"use client";

import { TOAST_PROP } from "@/context/Provider";
import useAuth from "@/hooks/useAuth";
import validateObject from "@/utils/validateObject";
import { Location } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function SignupForm({ locations }: { locations: Location[] }) {
  const { signUp, loading } = useAuth();

  const router = useRouter();

  const initialState = {
    first_name: "",
    last_name: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  };

  const [input, setInput] = useState(initialState);
  const [otherCity, setOtherCity] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = validateObject(input);
    if (obj.error) {
      toast.error(`${obj.key} cannot be empty!!`, TOAST_PROP);
      return;
    }
    await signUp(input);
    setInput(initialState);
    router.replace("/");
  };
  return (
    <form
      className={`p-3 border shadow-2xl mt-5 border-neutral-300 w-full bg-white rounded-lg`}
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-slate-700 text-center my-4">
        Create An Account
      </h1>
      <div className={`p-3  grid grid-cols-1 md:grid-cols-2 md:gap-3`}>
        <input
          name="first_name"
          type="text"
          placeholder="Enter first name"
          className="py-2 px-3 border border-slate-500 focus:outline-none rounded-md  focus:border-red-500 my-3"
          value={input.first_name}
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          type="text"
          placeholder="Enter last name"
          className="py-2 px-3 border border-slate-500 focus:outline-none rounded-md  focus:border-red-500 my-3"
          value={input.last_name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          type="number"
          placeholder="Enter your phone number"
          className="py-2 px-3 border border-slate-500 focus:outline-none rounded-md  focus:border-red-500 my-3"
          value={input.phone}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="py-2 px-3 border border-slate-500 focus:outline-none rounded-md  focus:border-red-500 my-3"
          value={input.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Enter password"
          className="py-2 px-3 border border-slate-500 focus:outline-none rounded-md  focus:border-red-500 my-3"
          value={input.password}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col">
          {otherCity ? (
            <input
              name="city"
              type="text"
              placeholder="Your City"
              className="py-2 px-3 border border-slate-500 focus:outline-none rounded-md  focus:border-red-500 mt-3"
              value={input.city}
              onChange={handleChange}
              required
            />
          ) : (
            <select
              name="city"
              value={input.city}
              onChange={handleChange}
              className="py-2 px-3 border border-slate-500 focus:outline-none rounded-md  focus:border-red-500 mt-3 capitalize text-center"
              required
            >
              <option hidden className="text-slate-500">
                {input.city || "--select your city--"}
              </option>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          )}
          <div className="flex gap-2 items-center">
            <input type="checkbox" onChange={() => setOtherCity(!otherCity)} />
            <p className="text-xs text-slate-500">
              check here to enter your city
            </p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`py-2 px-2 bg-red-500 text-white rounded-md  my-2 text-lg hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out md:col-span-2 w-full`}
      >
        {loading ? <ClipLoader color="white" size={"1.3rem"} /> : "Submit"}
      </button>
      <p className="w-full flex justify-center items-center gap-1 mb-1">
        <span>Already have an account?</span>{" "}
        <Link href={"/?login=true"} className="text-red-400 hover:underline">
          Login Here
        </Link>
      </p>
    </form>
  );
}
