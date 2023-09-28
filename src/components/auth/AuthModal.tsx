"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { BsXCircleFill } from "react-icons/bs";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import validateObject from "@/utils/validateObject";
import { toast } from "react-toastify";
import { TOAST_PROP } from "@/context/Provider";
import Link from "next/link";

export default function AuthModal() {
  const ref = useRef<HTMLDialogElement>(null);

  const { signIn, loading } = useAuth();

  const { openLoginModal } = useAuth();

  const router = useRouter();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    ref.current?.showModal();
  };
  const handleClose = () => {
    setOpen(false);
    ref.current?.close();
    router.replace("/");
  };

  useEffect(() => {
    openLoginModal ? handleOpen() : handleClose();
  }, [openLoginModal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const res = await signIn({
      email: input.email,
      password: input.password,
    });

    if (res) ref.current?.close();

    const prevUrl = sessionStorage.getItem("prevUrl");
    if (prevUrl) {
      router.push(prevUrl);
      sessionStorage.removeItem("prevUrl");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`px-4 py-2 rounded-md border bg-btn text-white border-white`}
      >
        Sign In
      </button>
      <dialog
        ref={ref}
        className={`w-full md:w-[500px] md:h-[400px]"
        } ${
          open ? "scale-100" : "scale-50"
        } bg-white p-4 border shadow-lg rounded-md transition-all duration-200 ease-linear `}
      >
        <div className="w-full flex justify-end">
          <BsXCircleFill
            role="button"
            size="1.5rem"
            className="text-slate-700"
            onClick={handleClose}
          />
        </div>
        <div className="my-2">
          <h3 className="text-xl text-center uppercase font-bold text-red-500">
            Sign In
          </h3>
          <h1 className="text-2xl text-center capitalize font-bold text-slate-700 my-3">
            Login to your account
          </h1>
          <form
            method="post"
            className={`p-3  grid grid-cols-1`}
            onSubmit={handleSubmit}
          >
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

            <button
              type="submit"
              className={`py-2 px-2 bg-red-500 text-white rounded-md  mt-2 text-lg hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out`}
            >
              {loading ? (
                <ClipLoader color="white" size={"1.3rem"} />
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <p className="flex justify-center w-full gap-1 items-center my-1">
            <span>Not a member?</span>
            <Link
              href={"/signup"}
              className="text-red-500 underline hover:no-underline"
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </dialog>
    </>
  );
}
