import React from "react";
import Image from "next/image";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Ratings from "./components/Ratings";
import Menu from "./components/Menu";
import ReservationCard from "./components/ReservationCard";
import UserReviewForm from "./components/UserReviewForm";
import prisma from "@/lib/PrismaClient";
import { Metadata } from "next";
import { FaLocationDot } from "react-icons/fa6";
import img from "../../../assets/img-placehoder.png";
interface RestaurantPageProps {
  params: {
    slug: string;
  };
}

const fetchRestaurantBySlug = async (slug: string) => {
  return await prisma.restaurant.findFirstOrThrow({
    where: { slug: slug },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      address: true,
      images: true,
      location: true,
      cuisine: true,
      cuisineStyle: true,
      description: true,
      open_time: true,
      close_time: true,
      main_image: true,
      reviews: { include: { user: true } },
      items: true,
    },
  });
};

//Generating dynamic metadata
export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  return {
    title: params.slug,
    description: `This is the ${params.slug} page`,
  };
};

export default async function RestaurantDetails({
  params,
}: RestaurantPageProps) {
  const { slug } = params;

  const restaurant = await fetchRestaurantBySlug(slug);

  return (
    <>
      <header className="h-1/2 md:h-[32rem] w-full">
        <Image
          src={restaurant.main_image || img}
          alt={"restaurant"}
          height={2000}
          width={2000}
          className="w-full h-full"
        />
      </header>
      <div className="w-[92%] md:w-[85%] m-auto flex flex-wrap justify-between -translate-y-14 h-full relative">
        <div className="bg-white w-full md:w-[65%] rounded-lg shadow-md px-3 py-1">
          {/* Navbar */}
          <RestaurantNavbar slug={slug} />
          <hr className="border border-gray-200" />

          <section id="overview" className="snap-mandatory">
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

            {/* Cuisine */}
            <p className="my-3 flex items-center gap-1 capitalize pl-1">
              <span className="font-medium">Cuisine: </span>
              <span>
                {restaurant.cuisine.name + " • " + restaurant.cuisineStyle}
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
          </section>

          <section id="menu">
            {/* Menu */}
            <div className="my-6">
              <h2 className="text-xl font-semibold capitalize mb-3">Menu</h2>
              <hr className="border border-gray-200 mb-4" />
              <Menu items={restaurant.items} />
            </div>
          </section>

          <section id="reviews">
            {/* Reviews */}
            <div className="my-6">
              <h2 className="text-xl text-slate-700 font-semibold capitalize mb-3">
                {restaurant.reviews.length > 0
                  ? `What ${restaurant.reviews.length} people are saying`
                  : "No reviews!!"}
              </h2>
              <hr className="border border-gray-200 mb-4" />
            </div>
            <UserReviewForm
              slug={restaurant.slug}
              userReviews={restaurant.reviews}
            />
          </section>
        </div>

        {/* Reservation section */}
        <div
          className="w-full md:w-[30%] bg-white rounded-lg shadow-md px-3 py-1 
        [&_label]:text-gray-600 [&_label]:font-semibold"
        >
          <ReservationCard
            openTime={restaurant.open_time}
            closeTime={restaurant.close_time}
            slug={slug}
          />
        </div>
      </div>
    </>
  );
}
