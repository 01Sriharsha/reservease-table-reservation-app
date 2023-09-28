"use client";

import { TOAST_PROP } from "@/context/Provider";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import img from "../../../../../../assets/img-placehoder.png";
import { apiClient } from "@/utils/axios";

interface UserDetailsProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    city: string;
    image: string;
  };
}

export default function UserDetails({ user }: UserDetailsProps) {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [image, setImage] = useState("");

  useEffect(() => {
    setInput({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
    setImage(user.image);
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files?.length <= 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgString = e.target?.result?.toString() || "";
      setImage(imgString);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiClient
      .post("/user/update", { ...input, image })
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        setInput(res.data.user);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to update!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div className="flex justify-center items-center px-4">
      <form className="w-[600px] my-3" onSubmit={handleSubmit}>
        <h3 className="text-md font-semibold capitalize">Basics: </h3>
        <div className="w-full grid place-items-center">
          <label
            htmlFor={!image ? "image" : ""}
            className="w-40 h-40 my-3 cursor-pointer"
          >
            <Image
              src={image || img}
              alt={user.first_name + "'s Pic"}
              width={1000}
              height={1000}
              className="w-full h-full rounded-full"
              onClick={() => image && setImage("")}
            />
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-gray-400 text-sm my-1">
            *click to {!image ? "upload" : "remove"} your profile picture
          </p>
        </div>
        <input
          type="text"
          name="first_name"
          placeholder="Enter Firstname"
          value={input.first_name}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter Lastname"
          value={input.last_name}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={input.email}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={input.phone}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={input.city}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
        />

        <button
          type="submit"
          className="p-2 border border-black text-white bg-slate-700 transition hover:bg-white hover:text-black my-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
