"use client";

import React, { useState } from "react";
import Stars from "@/components/Stars";
import useAuth from "@/hooks/useAuth";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlineReply } from "react-icons/hi";
import { ROLE } from "@prisma/client";
import ReplyModal from "@/app/(protected)/business/[slug]/_components/ReplyModal";
import { describeRating } from "@/utils/describeRating";
import { usePathname } from "next/navigation";

export interface ReviewCardType {
  id: number;
  rating: number;
  message: string;
  dine_date: string;
  user: {
    id?: number;
    first_name: string;
    last_name: string;
  };
}

interface ReviewCardProps {
  review: ReviewCardType;
  handleDeleteReview?: (id: number) => void;
  slug?: string;
}

export default function ReviewCard({
  review,
  handleDeleteReview,
  slug,
}: ReviewCardProps) {
  const { data } = useAuth();

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-12 my-3 gap-3 border border-neutral-300 shadow-lg p-3 rounded-md">
      <div className="flex flex-col justify-center items-center col-span-3">
        <div className="text-center flex justify-center flex-col items-center">
          <p className="text-white font-bold rounded-full w-16 h-16 bg-purple-400 flex flex-col justify-center items-center text-center uppercase">
            <span>{review.user.first_name[0] + review.user.last_name[0]}</span>
          </p>
          <h3 className="text-md font-semibold text-center flex capitalize">
            {review.user.first_name + " " + review.user.last_name}
          </h3>
        </div>
      </div>

      <div className="col-span-9 flex flex-col justify-between ml-5">
        <div className="flex justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Stars rating={review.rating} reviews={[]} />
              <span className="font-semibold text-slate-700 capitalize">
                {describeRating(review.rating)}
              </span>
            </div>
            <div>
              {data?.id === review.user.id && handleDeleteReview && (
                <AiFillDelete
                  size={"1rem"}
                  color="red"
                  className="cursor-pointer mr-2"
                  onClick={() => handleDeleteReview(review.id)}
                />
              )}
              {pathname.includes("/business") && data?.role === ROLE.OWNER && (
                <>
                  <HiOutlineReply
                    size={"1rem"}
                    color="green"
                    className="cursor-pointer mr-2"
                    onClick={() => setOpen(true)}
                  />
                  <ReplyModal
                    id={review.id}
                    slug={slug as string}
                    open={open}
                    setOpen={setOpen}
                    username={review.user.first_name}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="my-3 w-full">
          <p>{review.message}</p>
        </div>
        <div className="flex justify-end w-full">
          <p className="font-semibold">{review.dine_date}</p>
        </div>
      </div>
    </div>
  );
}
