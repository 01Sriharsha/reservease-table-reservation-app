"use client";

import { TOAST_PROP } from "@/context/Provider";
import { apiClient } from "@/utils/axios";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function PublishRestaurant({
  published: publish,
  slug,
}: {
  published: boolean;
  slug: string;
}) {
  const [published, setPublished] = useState(publish);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(
        apiClient.post(`/admin/manage/restaurant/publish`, {
          publish: !publish,
          slug,
        }),
        { pending: publish ? "unpublishing..." : "publishing...." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message , TOAST_PROP);
        setPublished(!published);
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
    <form onSubmit={handleSubmit}>
      <p className="grid grid-cols-6 my-2">
        <span className="col-span-2 font-medium">Published : </span>
        <span className="col-span-4 capitalize">
          {published ? "YES" : "NO"}
        </span>
      </p>
      <button
        type="submit"
        className={`px-4 py-2 mt-3 text-white hover:bg-white border hover:text-slate-700 transition ${
          published
            ? "bg-red-500 hover:border-red-500"
            : "bg-green-500 hover:border-green-500 "
        }`}
      >
        {published ? "Unpublish" : "Publish"}
      </button>
    </form>
  );
}
