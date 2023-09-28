import Image from "next/image";
import React from "react";
import Price from "./Price";
import Stars from "./Stars";
import { Cuisine, Location, Restaurant, Review } from "@prisma/client";
import img from "../assets/img-placehoder.png";

interface RestaurantCardProp {
  restaurant: Restaurant & {
    location: Location;
    reviews: Review[];
    cuisine: Cuisine;
  };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProp) {
  return (
    <div className="border w-72 shadow-lg rounded-md">
      <Image
        src={restaurant.main_image || img}
        alt="image"
        height={1000}
        width={1000}
        className="object-fill w-full h-44"
        loading="lazy"
        quality={80}
        sizes="(min-width: 60em) 24vw,
        (min-width: 28em) 45vw,
        100vw"
      />
      <div className="flex flex-col p-3 border gap-3">
        <h3 className="capitalize text-[115%] font-bold text-gray-700">
          {restaurant.name}
        </h3>
        <div className="flex items-center gap-6">
          <Stars reviews={restaurant.reviews} />
          <p className="font-semibold">
            {restaurant.reviews.length} review
            {restaurant.reviews.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center capitalize justify-start gap-2 font-light">
          <p>{restaurant.cuisine.name}</p>•
          <Price price={restaurant.price} />•<p>{restaurant.location.name}</p>
        </div>
      </div>
    </div>
  );
}
