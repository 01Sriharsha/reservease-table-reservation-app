import ReviewCard, {
  ReviewCardType,
} from "@/app/restaurant/[slug]/components/ReviewCard";
import prisma from "@/lib/PrismaClient";
import React from "react";

export default async function ManageReviews({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const reviews: ReviewCardType[] = await prisma.review.findMany({
    where: { restaurant: { slug } },
    select: {
      id: true,
      rating: true,
      message: true,
      dine_date: true,
      user: { select: { id: true, first_name: true, last_name: true } },
    },
  });

  if (reviews.length === 0 || !reviews) {
    return (
      <div className="h-[60vh] flex items-center justify-center overflow-y-auto w-full">
        <h3 className="text-2xl text-slate-800 font-bold">
          No reviews or ratings!!
        </h3>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-full p-3">
      <h1 className="text-2xl font-semibold text-slate-800 my-3">
        Reviews and ratings:{" "}
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} slug={slug} />
        ))}
      </div>
    </div>
  );
}
