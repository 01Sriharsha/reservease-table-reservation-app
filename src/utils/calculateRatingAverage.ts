import { Review } from "@prisma/client";

export const calculateRatingAverage = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => {
        return review.rating + sum
    }, 0) / reviews.length
}