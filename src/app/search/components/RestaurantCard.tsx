import Image from "next/image";
import React from "react";
import { SearchRestaurantCard } from "../page";
import Price from "@/components/Price";
import { calculateRatingAverage } from "@/utils/calculateRatingAverage";
import Stars from "@/components/Stars";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: SearchRestaurantCard;
}) {
  const renderRatingText = () => {
    const rating = calculateRatingAverage(restaurant.reviews);
    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating >= 3) return "Good";
    else if (rating < 3 && rating > 0) return "Average";
    else "";
  };

  return (
    <div className="flex gap-6 p-3 rounded-md my-3">
      <div className="flex justify-center items-center">
        <Image
          src={restaurant.main_image}
          alt="img"
          height={1000}
          width={2000}
          className="w-36  h-28  rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-md md:text-xl text-[#247f9e] font-bold capitalize">
          {restaurant.name}
        </h2>
        <div className="flex items-center gap-4 text-sm md:text-md font-medium text-gray-600">
          <Stars reviews={restaurant.reviews} />
          <p className="capitalize">{renderRatingText()}</p>
        </div>
        <div className="flex items-center gap-2 font-light text-sm md:text-md">
          <Price price={restaurant.price} />•<p>International</p>
        </div>
      </div>
    </div>
  );
}
