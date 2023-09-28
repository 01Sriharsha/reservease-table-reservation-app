import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

interface ReviewParams {
  params: {
    slug: string;
    id: string;
  };
}

export async function DELETE(req: NextRequest, { params }: ReviewParams) {

  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const { slug, id } = params;

  const reviewId = parseInt(id);

  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });

  const review = await prisma.review.findUnique({ where: { id : reviewId } });

  if (!restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found!!" },
      { status: 400 }
    );
  }

  if (!review) {
    return NextResponse.json({ error: "Review not found!!" }, { status: 400 });
  }

  const deleted = await prisma.review.delete({ where: { id: reviewId } });

  if (!deleted) {
    return NextResponse.json(
      { error: "Failed to delete the review!!" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: "Review deleted successfully!!" },
    { status: 200 }
  );
}
