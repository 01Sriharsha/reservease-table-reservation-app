import Stars from "@/components/Stars";
import { calculateRatingAverage } from "@/utils/calculateRatingAverage";
import { Review } from "@prisma/client";
import React from "react";

export default function Ratings({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end justify-start gap-8 my-4">
      <div className="flex items-center gap-3">
        <Stars reviews={reviews} />
        <p>{calculateRatingAverage(reviews).toFixed(1)}</p>
      </div>
      <div>
        <p className="text-md font-semibold">
          {reviews.length} review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
