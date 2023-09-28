import useAuth from "@/hooks/useAuth";
import React, { useRef } from "react";
import { BsXCircle } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function SignOutModal() {
  const ref = useRef<HTMLDialogElement>(null);

  const { signOut } = useAuth();

  const router = useRouter();

  const handleOpen = () => ref.current?.showModal();

  const handleClose = () => ref.current?.close();

  const handleSignOut = async () => {
    signOut();
    handleClose();
    router.replace("/");
  };

  return (
    <>
      <div
        role="button"
        className="text-slate-700 p-2 flex items-center gap-1 hover:bg-neutral-400"
        onClick={handleOpen}
      >
        <CiLogout size={"1rem"} />
        <span>Signout</span>
      </div>
      <dialog ref={ref} className="w-96 h-48 rounded-lg shadow-sm">
        <div className="flex justify-end w-full">
          <BsXCircle
            size={"1.2rem"}
            role="button"
            onClick={handleClose}
            color="red"
          />
        </div>
        <div className="flex flex-col justify-between h-32">
          <p className="my-2 text-lg px-3">Are you sure want to sign out?</p>
          <hr />
          <div className="flex gap-4 w-100 justify-end">
            <button
              className="py-2 px-6 bg-slate-500 text-white text-center rounded-md"
              onClick={handleClose}
            >
              No
            </button>
            <button
              className="py-2 px-6 bg-red-500 text-white text-center rounded-md"
              onClick={handleSignOut}
            >
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
