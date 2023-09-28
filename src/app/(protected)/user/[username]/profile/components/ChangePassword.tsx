"use client";

import { TOAST_PROP } from "@/context/Provider";
import { apiClient } from "@/utils/axios";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface ChangePasswordProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone: string;
    city: string;
  };
}

export default function ChangePassword({ user }: ChangePasswordProps) {
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const validate = () => {
    if (input.newPassword !== input.confirmPassword) {
      toast.error("Confirm password doesn't match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    apiClient
      .post("/user/change-password", { ...input, email: user.email })
      .then((res) => {
        toast.success("Password changed successfully!!", TOAST_PROP);
        handleReset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to change password!!",
          TOAST_PROP
        );
      });
  };

  const handleReset = () =>
    setInput({ oldPassword: "", newPassword: "", confirmPassword: "" });

  return (
    <div className="flex justify-center items-center px-4">
      <form className="w-[600px] my-3" onSubmit={handleSubmit}>
        <h3 className="text-md font-semibold capitalize">Password: </h3>
        <input
          type="password"
          name="oldPassword"
          placeholder="Enter Old Password"
          value={input.oldPassword}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          value={input.newPassword}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={input.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-black focus:outline-none my-3"
          required
          autoComplete="off"
        />

        <button
          type="submit"
          className="p-2 text-white bg-slate-700 transition hover:bg-white hover:text-black my-4 hover:border hover:border-black"
        >
          Save Password
        </button>
      </form>
    </div>
  );
}
