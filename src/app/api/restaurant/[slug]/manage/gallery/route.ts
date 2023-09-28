import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

interface GalleryImages {
  images: string[];
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const body: GalleryImages = await req.json();

  const { images } = body;

  const { slug } = params;

  if (!images) {
    return NextResponse.json(
      { error: "Add images to upload!!" },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return NextResponse.json(
      { error: "restaurant not found!!" },
      { status: 400 }
    );
  }

  const restaurant_images = await prisma.restaurant.update({
    where: { slug },
    data: { images },
  });

  if (!restaurant_images) {
    return NextResponse.json(
      { error: "Failed to upload the images!!" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Images added to the gallery successfully!!" },
    { status: 201 }
  );
}
