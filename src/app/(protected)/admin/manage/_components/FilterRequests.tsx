import React, { useState } from "react";
import { RenderBusinessRequestsProps } from "./RenderBusinessRequests";
import { STATUS } from "@prisma/client";

export default function FilterRequests({
  AllRequests,
  setRequests,
}: {
  AllRequests: RenderBusinessRequestsProps["requests"];
  setRequests: React.Dispatch<
    React.SetStateAction<RenderBusinessRequestsProps["requests"]>
  >;
}) {
  const [active, setActive] = useState<STATUS | string>();

  const isPending = active === STATUS.PENDING;
  const isApproved = active === STATUS.APPROVED;
  const isRejected = active === STATUS.REJECTED;

  const filterPendingRequests = () => {
    setRequests(AllRequests);
    setActive(STATUS.PENDING);
    setRequests((prev) =>
      prev.filter((request) => request.status === STATUS.PENDING)
    );
  };
  const filterApprovedRequests = () => {
    setRequests(AllRequests);
    setActive(STATUS.APPROVED);
    setRequests((prev) =>
      prev.filter((request) => request.status === STATUS.APPROVED)
    );
  };
  const filterRejectedRequests = () => {
    setRequests(AllRequests);
    setActive(STATUS.REJECTED);
    setRequests((prev) =>
      prev.filter((request) => request.status === STATUS.REJECTED)
    );
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center w-full justify-end my-2">
        <button
          className={`px-5 py-2 border border-neutral-400 rounded-md ${
            active === "all" && "text-blue-500 border-blue-500"
          }`}
          onClick={() => {
            setRequests(AllRequests);
            setActive("all");
          }}
        >
          All
        </button>
        <button
          className={`px-5 py-2 border border-neutral-400 rounded-md ${
            isPending && "text-orange-500 border-orange-500"
          }`}
          onClick={filterPendingRequests}
        >
          Pending
        </button>
        <button
          className={`px-5 py-2 border border-neutral-400 rounded-md ${
            isApproved && "text-green-500 border-green-500"
          }`}
          onClick={filterApprovedRequests}
        >
          Approved
        </button>
        <button
          className={`px-5 py-2 border border-neutral-400 rounded-md ${
            isRejected && "text-red-500 border-red-500"
          }`}
          onClick={filterRejectedRequests}
        >
          Rejected
        </button>
      </div>
    </div>
  );
}
