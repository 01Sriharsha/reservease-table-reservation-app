"use client";

import { BusinessRequest, ROLE, STATUS } from "@prisma/client";
import { FiExternalLink } from "react-icons/fi";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { apiClient } from "@/utils/axios";
import { TOAST_PROP } from "@/context/Provider";
import { useRouter } from "next/navigation";
import FilterRequests from "./FilterRequests";

export interface RenderBusinessRequestsProps {
  requests: (BusinessRequest & {
    user: {
      email: string;
      first_name: string;
      last_name: string;
      role: ROLE;
    };
  })[];
}

export default function RenderBusinessRequests({
  requests: AllRequests,
}: RenderBusinessRequestsProps) {
  const [requests, setRequests] = useState(AllRequests);

  const router = useRouter();

  const handleRequest = (id: number, email: string, status: STATUS) => {
    toast
      .promise(
        apiClient.post(`/admin/manage/request/${id}`, { email, status }),
        { pending: "Processing..." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to process request!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div className="w-full">
      <FilterRequests AllRequests={AllRequests} setRequests={setRequests} />
      {requests.length === 0 ? (
        <h2 className="text-2xl text-slate-700 font-bold mt-32 grid place-items-center">
          No requests!!
        </h2>
      ) : (
        <div className="grid grid-cols-1 gap-4 my-2">
          {requests.map((request) => (
            <div
              key={request.request_id}
              className="bg-white p-4 rounded-md shadow-lg  shad shadow-black/30 flex flex-col"
            >
              <div className="flex gap-2 items-center text-red-400">
                <h2 className="text-2xl  font-semibold mb-2 capitalize">
                  {request.user.first_name + " " + request.user.last_name}
                </h2>
                <Link href={`mailto:${request.user.email}`} className="mb-1">
                  ({request.user.email.toLocaleLowerCase()})
                </Link>
              </div>

              <h3 className="text-lg font-semibold my-3 underline">
                Restaurant details:{" "}
              </h3>
              <div className="flex flex-col gap-3 text-zinc-800">
                <p className="flex gap-2 items-center capitalize">
                  <span className="font-medium">Restaurant name: </span>
                  <span>{request.restaurant_name}</span>
                </p>
                <p className="flex gap-2 items-center capitalize">
                  <span className="font-medium">Restaurant GST.No: </span>
                  <span>{request.restaurant_gst}</span>[
                  <Link
                    href="https://services.gst.gov.in/services/searchtp"
                    target="_blank"
                    className="flex gap-1 items-center hover:text-red-300"
                  >
                    <span>Verify</span>
                    <FiExternalLink size={"1rem"} />
                  </Link>
                  ]
                </p>
                <p className="flex gap-2 items-center capitalize">
                  <span className="font-medium">Restaurant Contact.No: </span>
                  <span>{request.restaurant_phone}</span>
                </p>
                <p className="flex gap-2 items-center capitalize">
                  <span className="font-medium">Restaurant Address: </span>
                  <span>{request.restaurant_address}</span>
                </p>
                <p className="flex gap-2 items-center capitalize">
                  <span className="font-medium">Restaurant city: </span>
                  <span>{request.restaurant_city}</span>
                </p>
              </div>

              <div className="mt-4 space-x-4 w-full flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded border border-black cursor-not-allowed ${
                    (request.status === STATUS.PENDING &&
                      "text-orange-500 border-orange-500") ||
                    (request.status === STATUS.APPROVED &&
                      "text-green-500 border-green-500") ||
                    (request.status === STATUS.REJECTED &&
                      "text-red-500 border-red-500")
                  }`}
                >
                  {request.status}
                </span>
                {request.status === "PENDING" && (
                  <div className="flex gap-4 items-center">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                      onClick={() =>
                        handleRequest(
                          request.request_id,
                          request.user.email,
                          STATUS["APPROVED"]
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      onClick={() =>
                        handleRequest(
                          request.request_id,
                          request.user.email,
                          STATUS["REJECTED"]
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
