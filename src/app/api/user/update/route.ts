import prisma from "@/lib/PrismaClient";
import validateObject from "@/utils/validateObject";
import { fi } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  image: string;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }
  const body: UserData = await req.json();

  const { first_name, last_name, email, phone, city, image } = body;

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} cannot be empty!!` },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { email },
    data: { first_name, last_name, email, phone, city, image },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      city: true,
      image: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "failed to update user!!" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "User details updated successfully!!", user },
    { status: 201 }
  );
}
