import Menu from "@/app/restaurant/[slug]/components/Menu";
import Ratings from "@/app/restaurant/[slug]/components/Ratings";
import ReviewCard from "@/app/restaurant/[slug]/components/ReviewCard";
import prisma from "@/lib/PrismaClient";
import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

interface DashboardParams {
  params: { slug: string };
}

export default async function Dashboard({ params }: DashboardParams) {
  const { slug } = params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      reviews: { include: { user: true } },
      items: true,
      owner: true,
      location: true,
    },
  });

  if (!restaurant) {
    return (
      <div className="h-full mt-10 font-bold text-slate-700 text-2xl grid place-items-center">
        Failed to load restaurant details!!
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-full px-4 py-2 m-auto">
      {/* Title */}
      <h1 className="capitalize text-[3rem] font-bold text-gray-700 mt-2 mb-4">
        {restaurant.name}
      </h1>
      <hr className="border border-gray-200" />

      {/* ratings */}
      <Ratings reviews={restaurant.reviews} />

      {/* description */}
      <article className="mt-6 mb-3">{restaurant.description}</article>

      {/* Address */}
      <p className="my-2 flex items-center gap-1 capitalize">
        <FaLocationDot color="red" />
        <span>
          {restaurant.address}, {restaurant.location.name}
        </span>
      </p>

      {/* Images */}
      <div className="my-4">
        <h3 className="text-xl font-semibold mt-4 mb-2">
          Images({restaurant?.images.length})
        </h3>
        <hr className="border border-gray-200 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {restaurant.images?.map((image, index) => (
            <Image
              src={image}
              key={index}
              alt={image}
              width={1000}
              height={1000}
              className="w-44 h-36"
            />
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="my-6">
        <h2 className="text-xl font-semibold capitalize mb-3">Menu</h2>
        <hr className="border border-gray-200 mb-4" />
        <Menu items={restaurant.items} />
      </div>

      {/* Reviews */}
      <div className="my-4">
        <h2 className="text-xl text-slate-700 font-semibold capitalize mb-3">
          {restaurant.reviews.length > 0
            ? `What ${restaurant.reviews.length} people are saying`
            : "No reviews!!"}
        </h2>
        <hr className="border border-gray-200 mb-4" />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurant.reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
