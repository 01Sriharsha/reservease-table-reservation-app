"use client";

import { TOAST_PROP } from "@/context/Provider";
import { apiClient } from "@/utils/axios";
import React, { useRef, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface BookingDeclineModalProps {
  refNo: string;
  slug: string;
  bookingId: number;
  isDeclined: boolean;
}

export default function BookingDeclineModal({
  refNo,
  slug,
  bookingId,
  isDeclined,
}: BookingDeclineModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const router = useRouter();

  const [input, setInput] = useState({
    decline_message: "",
    isDeclined: false,
  });

  const handleOpen = () => ref.current?.showModal();

  const handleClose = () => ref.current?.close();

  const handleSubmit = () => {
    if (!input.decline_message) {
      toast.error("Specify reason for decline!!", TOAST_PROP);
      return;
    }
    setInput((prev) => ({ ...prev, isDeclined: true }));
    toast
      .promise(
        apiClient.post(
          `/restaurant/${slug}/manage/booking/${bookingId}/decline`,
          {
            ...input,
          }
        ),
        { pending: "Posting..." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        handleClose();
        router.refresh();
      })
      .catch((err) => {
        handleClose();
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to decline booking!!",
          TOAST_PROP
        );
      });
  };

  return (
    <>
      <button
        disabled={isDeclined}
        className={`px-3 py-1 my-2 rounded-md border hover:border-black hover:bg-white hover:text-black transition bg-red-500 text-white ${
          isDeclined && "cursor-not-allowed"
        }`}
        onClick={handleOpen}
      >
        {isDeclined ? "Declined" : "Decline"}
      </button>
      <dialog ref={ref} className=" w-full md:w-[40%] rounded-lg shadow-sm">
        <div className="flex justify-between w-full items-center">
          <p className="text-2xl font-semibold text-slate-700 my-2">
            Decline Booking: #{refNo?.toLocaleUpperCase()}
          </p>
          <BsXCircle
            size={"1.2rem"}
            role="button"
            onClick={handleClose}
            color="red"
          />
        </div>
        <div className="flex flex-col justify-between">
          <textarea
            name="decline_message"
            value={input.decline_message}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, decline_message: e.target.value }))
            }
            rows={3}
            placeholder="Reason for decline..."
            className="p-2 border hover:border-black border-neutral-400 focus:outline-none my-3 rounded-md"
          />
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
              onClick={handleSubmit}
            >
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
