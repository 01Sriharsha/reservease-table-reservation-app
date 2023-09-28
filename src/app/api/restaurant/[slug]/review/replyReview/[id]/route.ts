import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

interface ReplyData {
  reply: string;
}

interface ReplyProps {
  params: { slug: string; id: string };
}

export async function POST(req: NextRequest, { params }: ReplyProps) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const body: ReplyData = await req.json();

  const { reply } = body;

  if (!reply) {
    return NextResponse.json(
      { error: "Reply cannot be empty!!" },
      { status: 400 }
    );
  }

  const id = parseInt(params.id);

  const { slug } = params;

  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found!!" },
      { status: 400 }
    );
  }

  const existingReview = await prisma.review.findUnique({ where: { id } });

  if (!existingReview) {
    return NextResponse.json({ error: "Review not found!!" }, { status: 400 });
  }

  const review = await prisma.review.update({
    where: { id },
    data: { reply },
    select: { user: { select: { first_name: true } } },
  });

  return NextResponse.json(
    { message: `Successfully replied to ${review.user.first_name}` },
    { status: 201 }
  );
}
