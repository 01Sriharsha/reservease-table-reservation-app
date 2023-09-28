import { calculateRatingAverage } from "@/utils/calculateRatingAverage";
import { Review } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import {
  FaStarHalfAlt as HalfStar,
  FaStar as FullStar,
  FaRegStar as EmptyStar,
} from "react-icons/fa";

export default function Stars({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const reviewRating = rating || calculateRatingAverage(reviews);

  const renderStars = () => {
    const stars: IconType[] = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1));

      if (difference >= 1) stars.push(FullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(EmptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(HalfStar);
        else stars.push(FullStar);
      } else {
        stars.push(EmptyStar);
      }
    }

    return stars.map((Star, index) => (
      <Star key={index} color="red" className="w-4 h-4" />
    ));
  };

  return <div className="flex gap-1">{renderStars()}</div>;
}
