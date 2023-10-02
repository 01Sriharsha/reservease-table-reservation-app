import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import validateObject from "@/utils/validateObject";

interface ReviewData {
  user_id: number;
  message: string;
  rating: number;
  dine_date: string;
}

export async function POST(req: NextRequest, { params }: {params : {slug : string}}) {

  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const body: ReviewData = await req.json();

  const { user_id, message, rating, dine_date } = body;

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} cannot be empty!!` },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: params.slug },
    select: { ownerId: true, id: true },
  });

  const user = await prisma.user.findUnique({ where: { id: user_id } });

  if (!restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found!!" },
      { status: 400 }
    );
  }
  if (!user) {
    return NextResponse.json({ error: "User not found!!" }, { status: 400 });
  }

  if (user.id === restaurant.ownerId) {
    return NextResponse.json(
      { error: "You cannot review your own restuarant!!" },
      { status: 400 }
    );
  }

  const restaurant_id = restaurant.id;

  const existingReview = await prisma.review.findFirst({
    where: { user_id, restaurant_id },
  });

  if (existingReview) {
    return NextResponse.json(
      { error: "You have alreday reviewed this restaurant!!" },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: { message, rating, restaurant_id, user_id, dine_date },
    select: {
      id: true,
      message: true,
      rating: true,
      dine_date : true,
      user_id: true,
      restaurant_id: true,
      user: { select: { first_name: true, last_name: true , id:true } },
    },
  });

  if (!review) {
    return NextResponse.json(
      { error: "Failed to post review!!" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Review posted successfully!!", review },
    { status: 201 }
  );
}
