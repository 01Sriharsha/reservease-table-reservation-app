"use client";

import { TOAST_PROP } from "@/context/Provider";
import useAuth from "@/hooks/useAuth";
import { apiClient } from "@/utils/axios";
import React, { FormEvent, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaStar as FullStar, FaRegStar as EmptyStar } from "react-icons/fa";
import { toast } from "react-toastify";
import ReviewCard, { ReviewCardType } from "./ReviewCard";
import { calculateDinedate } from "@/utils/calculateDinedate";

export default function UserReviewForm({
  slug,
  userReviews,
}: {
  slug: string;
  userReviews: ReviewCardType[];
}) {
  const ref = useRef<HTMLInputElement>(null);

  const [reviews, setReviews] = useState<ReviewCardType[]>(userReviews);

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [dineDate, setDinedate] = useState("");
  
  const { data } = useAuth();

  function renderStars() {
    const stars: IconType[] = [];

    for (let i = 0; i < 5; i++) {
      const difference = rating - i;
      if (difference >= 1) stars.push(FullStar);
      else stars.push(EmptyStar);
    }

    return stars.map((Star, index) => (
      <Star
        key={index}
        color="red"
        className="w-4 h-4 cursor-pointer"
        onClick={() => setRating(index + 1)}
      />
    ));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data?.id) {
      toast.info("Login to post a review!!", TOAST_PROP);
      return;
    }
    if (rating == 0) {
      toast.error("Rating should be atleast one!!", TOAST_PROP);
      return;
    }
    if (!message) {
      toast.error("Please provide feedback!!", TOAST_PROP);
      return;
    }
    const dine_date = calculateDinedate(dineDate);
    apiClient
      .post(`/restaurant/${slug}/review/createReview`, {
        user_id: data?.id,
        message,
        rating,
        dine_date,
      })
      .then((res) => {
        setMessage("");
        setRating(0);
        toast.success("Review Posted Successfully!!", TOAST_PROP);
        setReviews((prev) => [...prev, res.data.review]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to post review!!",
          TOAST_PROP
        );
      });
  };

  const handleDeleteReview = (id: number) => {
    apiClient
      .delete(`/restaurant/${slug}/review/deleteReview/${id}`)
      .then((res) => {
        toast.success("Review deleted successfully!!", TOAST_PROP);
        setReviews((prev) => prev.filter((e) => e.id !== id));
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to delete the review!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div>
      {/* Review Card */}
      {reviews.map((review) => (
        <>
          <ReviewCard
            review={review}
            key={review.id}
            handleDeleteReview={handleDeleteReview}
          />
          <hr />
        </>
      ))}

      {/* Review Form */}
      <h4 className="text-md font-semibold capitalize mt-3">
        Rate this restaurant:{" "}
      </h4>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="flex gap-3 my-2">{renderStars()}</span>
          {rating !== 0 && (
            <span className="font-semibold text-md text-slate-800">
              {rating}/5
            </span>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <h4 className="text-md font-semibold capitalize">Your Feedback: </h4> */}
        <textarea
          rows={2}
          placeholder="Write your review here..."
          className="w-full p-2 border border-black focus:outline-none my-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label htmlFor="dinedate">When did you dine here?</label>
        <input
          ref={ref}
          id="dinedate"
          type="date"
          placeholder="When did you dine here?"
          className="w-full p-2 border border-black focus:outline-none my-2"
          onChange={(e) =>
            setDinedate(e.target.valueAsDate?.toISOString() as string)
          }
        />
        <button
          type="submit"
          className="p-2 bg-slate-700 text-white border border-black hover:text-black hover:bg-white transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
